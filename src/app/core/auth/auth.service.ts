import { inject, Injectable, OnInit } from "@angular/core";
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from "@supabase/supabase-js";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { LoadingService } from "../services/loading.service";
import { NotificationService } from "../services/notification.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly supabase: SupabaseClient;
  _session: AuthSession | null = null;
  private _sessionLoadingPromise: Promise<AuthSession | null> | null = null;
  private _recoveryMode = false;
  // Sesión temporal devuelta por verifyOtp (no persistida)
  private _transientSession: AuthSession | null = null;

  //inyeccion de depdencias
  private readonly router = inject(Router);
  private readonly loadingService = inject(LoadingService);
  private readonly notificationService = inject(NotificationService);

  get session() {
    return this._session;
  }

  get isRecoverySession(): boolean {
    return this._recoveryMode;
  }

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    // Escucha cambios de autenticación para detectar flujos especiales (e.g., recovery)
    this.supabase.auth.onAuthStateChange((event: AuthChangeEvent, session) => {
      // Actualizar sesión interna
      this._session = session as AuthSession | null;

      if (event === "PASSWORD_RECOVERY") {
        // Activar modo recuperación y redirigir al formulario de nueva contraseña
        this._recoveryMode = true;
        if (session) {
          // Persistir para sobrevivir recargas
          this.supabase.auth.setSession(session);
        }
        // Redirigir sólo si no estamos ya en la ruta
        if (!this.router.url.startsWith("/auth/reset-password")) {
          this.router.navigate(["/auth/reset-password"]);
        }
        return;
      }

      if (event === "SIGNED_OUT") {
        this._recoveryMode = false;
        return;
      }

      if (event === "SIGNED_IN") {
        // Si se firmó de forma normal, salir de modo recovery
        this._recoveryMode = false;
        return;
      }

      // Si el usuario se actualiza (ej. metadata desde backend), refrescamos cache local
      if (event === "USER_UPDATED") {
        console.log("User updated, refreshing local session");
        this._session = session as AuthSession | null;
        return;
      }

      if (event === "TOKEN_REFRESHED") {
        // Token de acceso renovado: actualizar sesión interna
        this._session = session as AuthSession | null;
        return;
      }
    });
  }

  getSession() {
    return this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
      return this._session;
    });
  }

  /**
   * Carga la sesión sólo si aún no está cargada.
   * Usa una promesa en caché para evitar llamadas simultáneas duplicadas.
   */
  ensureSessionLoaded(): Promise<AuthSession | null> {
    if (this._session) {
      return Promise.resolve(this._session);
    }
    if (this._sessionLoadingPromise !== null) {
      return this._sessionLoadingPromise;
    }
    this._sessionLoadingPromise = this.supabase.auth
      .getSession()
      .then(({ data }) => {
        this._session = data.session;
        return this._session;
      })
      .finally(() => {
        this._sessionLoadingPromise = null;
      });
    return this._sessionLoadingPromise;
  }

  profile() {
    return this.supabase.auth.getUser();
  }

  /**
   * Recarga el usuario desde Supabase y actualiza la sesión en memoria
   * para reflejar cambios de metadata hechos por el backend (por ejemplo, idPersona).
   */
  reloadUser(): Promise<User | null> {
    return this.refreshSession().then(() => {
      return this.profile().then(({ data, error }) => {
        if (error) {
          console.error("No se pudo recargar el usuario:", error.message);
          return null;
        }
        if (this._session && data.user) {
          // Actualizar el usuario cacheado en la sesión local
          (this._session as any).user = data.user;
        }
        return data.user ?? null;
      });
    });
  }

  /**
   * Fuerza la renovación del access_token usando el refresh_token actual.
   * Útil cuando el backend actualiza metadata que el backend leerá desde el JWT.
   */
  refreshSession(): Promise<AuthSession | null> {
    return this.supabase.auth.refreshSession().then(({ data, error }) => {
      if (error) {
        console.warn("No se pudo refrescar la sesión:", error.message);
        return this._session;
      }
      if (data?.session) {
        this._session = data.session;
        // Persistir la sesión renovada para futuras peticiones/interceptores
        this.supabase.auth.setSession(data.session);
        // Si el método también retornó user, sincronizarlo en memoria
        const user = data?.user;
        if (user && this._session) {
          (this._session as any).user = user;
        }
      }
      return this._session;
    });
  }

  signIn(
    user: string,
    password: string
  ): Promise<{ user: User | null; error: Error | null }> {
    this.loadingService.show();
    return this.supabase.functions
      .invoke("login", { body: { user, password } })
      .then(async (resp) => {
        console.log(resp);
        const data = resp.data;
        const { error } = resp.error
          ? await resp.response.json()
          : { error: null };
        console.log(data, error);
        // Mostrar mensaje de error si existe
        if (error) {
          this.notificationService.showError(
            error.code === "invalid_credentials"
              ? "Usuario no existe o contraseña incorrecta."
              : error.message
          );
        } else {
          this._session = data.session;
          this.supabase.auth.setSession(data.session);
          this.notificationService.showSuccess("Inicio de sesión exitoso");
        }

        return { user: data?.user, error };
      })
      .catch(() => {
        this.notificationService.showError(
          "Usuario no existe o porfavor revise su conexion a internet."
        );
        return null;
      })
      .finally(() => {
        this.loadingService.hide();
      });
  }

  /**
   * Envía un código de verificación al correo electrónico del usuario
   * Este método inicia el proceso de registro enviando un OTP (One Time Password)
   * al email proporcionado. El usuario recibirá un código de 6 dígitos.
   *
   * NOTA: Este método permite crear el usuario temporalmente para poder enviar el OTP,
   * y no estará disponible el usuario hasta que se complete el proceso de verificación.
   *
   * @param email - Dirección de correo electrónico donde se enviará el código
   * @returns Promise con el resultado de la operación (error si falla)
   */
  sendCodeVerification(
    email: string,
    numeroDocumento: number
  ): Promise<{ error: Error | null }> {
    this.loadingService.show();
    //llama al endpoint en supabase que verifica y envia el codigo para crear usuario.
    return this.supabase.functions
      .invoke("create-user-logic", {
        body: {
          email,
          numeroDocumento,
        },
      })
      .then((resp) => {
        const error = resp.error ?? resp.data.error;
        if (error) {
          const code = (error as any)?.code ?? (error as any)?.status ?? "";
          if (
            code === "over_email_send_rate_limit" ||
            code === 429 ||
            code === "email_rate_limit_exceeded"
          ) {
            this.notificationService.showError(
              "Se ha superado el límite de envío de correos. Por favor, inténtelo en 5 minuto."
            );
          } else {
            this.notificationService.showError(
              `Error al enviar código: ${error.message}`
            );
          }
        } else {
          this.notificationService.showSuccess(
            "Código de verificación enviado al correo"
          );
        }
        return { error };
      })
      .finally(() => {
        this.loadingService.hide();
      });
  }

  /**
   * Verifica el código de verificación enviado al correo electrónico
   * Este método valida el código de 6 dígitos que el usuario recibió por email.
   * Si el código es válido, retorna un token que se puede usar para crear la cuenta.
   *
   * @param email - Dirección de correo electrónico del usuario
   * @param token - Código de verificación de 6 dígitos
   * @returns Promise con el resultado de la verificación y datos de sesión temporal
   */
  verifyEmailCode(
    email: string,
    token: string
  ): Promise<{ error: Error; verified: boolean }> {
    this.loadingService.show();
    return this.supabase.auth
      .verifyOtp({
        email,
        token,
        type: "email",
      })
      .then(({ data, error }) => {
        if (error) {
          this.notificationService.showError(
            `Error al verificar el código: ${error.message}`
          );
          return { error, verified: false };
        }

        // Guardar sesión temporal (no persistente) para el siguiente paso
        this._transientSession = data.session ?? null;
        // Actualizar metadata para reflejar avance del onboarding usando sesión temporal
        if (this._transientSession) {
          return this.withTransientSession(this._transientSession, () =>
            this.supabase.auth.updateUser({
              data: {
                onboarding_step: "otp_verified",
              },
            })
          )
            .then(({ error: updateError }) => {
              if (updateError) {
                // No es crítico, solo avisamos
                this.notificationService.showError(
                  `Código verificado pero fallo: ${updateError.message}`
                );
              } else {
                this.notificationService.showSuccess(
                  "Código verificado exitosamente"
                );
              }
              return { error: updateError ?? error, verified: true };
            });
        }
        // No hay sesión (muy raro), pero igualmente devolvemos verificación
        this.notificationService.showSuccess("Código verificado exitosamente");
        return { error: null as any, verified: true };
      })
      .finally(() => {
        this.loadingService.hide();
      });
  }

  /**
   * Crea la cuenta del usuario con contraseña después de verificar el email
   * Este método completa el proceso de registro estableciendo la contraseña
   * del usuario después de que su email haya sido verificado exitosamente.
   *
   * @param numeroDocumento - Número de documento del usuario
   * @param email - Dirección de correo electrónico del usuario
   * @param password - Contraseña que el usuario desea establecer
   * @returns Promise con los datos del usuario creado o error
   */
  createUserAccount(
    password: string
  ): Promise<{ user: User | null; error: Error | null }> {
    this.loadingService.show();
    // Intentar usar sesión persistente; si no existe, usar sesión transitoria guardada por verify
    const tryAction = async () => {
      const session = this._session ?? this._transientSession ?? (await this.ensureSessionLoaded());
      if (!session) {
        const err = new Error(
          "Sesión no encontrada. Verifique el código antes de crear la contraseña."
        );
        this.notificationService.showError(err.message);
        throw err;
      }
      return this.withTransientSession(session, () =>
        this.supabase.auth.updateUser({
          password,
          data: {
            onboarding_step: "completed",
          },
        })
      );
    };

    return tryAction()
      .then(({ data, error }) => {
        if (error) {
          this.notificationService.showError(
            `Error al establecer la contraseña: ${error.message}`
          );
          return { user: null as User | null, error: error as Error };
        }

        if (data?.user) {
          this.notificationService.showSuccess(
            "Cuenta completada exitosamente"
          );
        }
        // Limpiar sesión transitoria después de completar el flujo
        this._transientSession = null;
        return { user: data?.user ?? null, error: null };
      })
      .catch((err) => {
        // Propaga el error como parte del contrato de salida
        return { user: null, error: err as Error };
      })
      .finally(() => {
        this.loadingService.hide();
      });
  }

  /**
   * Valida los requisitos de contraseña según las reglas del sistema
   * Verifica que la contraseña cumpla con los criterios de seguridad:
   * - Al menos un número
   * - Al menos una mayúscula
   * - Al menos 5 caracteres de longitud
   *
   * @param password - Contraseña a validar
   * @returns Objeto con el estado de validación y criterios cumplidos
   */
  validatePasswordRequirements(password: string): {
    isValid: boolean;
    hasNumber: boolean;
    hasUppercase: boolean;
    hasMinLength: boolean;
  } {
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasMinLength = password.length >= 5;

    return {
      isValid: hasNumber && hasUppercase && hasMinLength,
      hasNumber,
      hasUppercase,
      hasMinLength,
    };
  }

  /**
   * Cierra la sesión actual del usuario
   * Limpia la sesión local y notifica a Supabase para cerrar la sesión
   *
   * @returns Promise con el resultado de la operación
   */
  signOut(): Promise<{ error: Error | null }> {
    this.loadingService.show();
    return this.supabase.auth
      .signOut()
      .then(({ error }) => {
        this.supabase.auth.setSession(null);
        this._session = null;
        this.router.navigate(["/auth"]); // Redirigir al login después de cerrar sesión
        return { error };
      })
      .finally(() => {
        this.loadingService.hide();
      });
  }

  /**
   * Envía un correo para restablecer la contraseña del usuario.
   * Supabase enviará un enlace al email. Al abrirlo, se crea una sesión de recuperación
   * y el front debe permitir establecer una nueva contraseña usando `auth.updateUser`.
   */
  sendPasswordReset(email: string): Promise<{ error: Error | null }> {
    this.loadingService.show();
    // Redirige al flujo de recuperación dentro de la app
    const redirectTo = `${window.location.origin}/auth/reset-password`;
    return this.supabase.auth
      .resetPasswordForEmail(email, { redirectTo })
      .then(({ error }) => {
        if (error) {
          this.notificationService.showError(
            `No se pudo enviar el correo: ${error.message}`
          );
          return { error };
        }
        this.notificationService.showSuccess(
          "Correo para restablecer la contraseña enviado exitosamente."
        );
        return { error: null };
      })
      .catch((e: unknown) => {
        const err = e as Error;
        this.notificationService.showError(
          `No se pudo enviar el correo por favor contacte al administrador`
        );
        return { error: err };
      })
      .finally(() => this.loadingService.hide());
  }

  /**
   * Establece una nueva contraseña para el usuario autenticado.
   * Usado en el flujo de recuperación (o sesión normal) para actualizar la clave.
   */
  resetPasswordWithNewPassword(
    password: string
  ): Promise<{ error: Error | null }> {
    this.loadingService.show();
    // Preferir sesión persistente; si no existe, usar la transitoria
    const doUpdate = async () => {
      const session = this._session ?? this._transientSession ?? (await this.ensureSessionLoaded());
      if (!session) {
        const err = new Error("No hay sesión activa para actualizar la contraseña.");
        this.notificationService.showError(err.message);
        throw err;
      }
      return this.withTransientSession(session, () => this.supabase.auth.updateUser({ password }));
    };

    return doUpdate()
      .then(async ({ error }) => {
        if (error) {
          this.notificationService.showError(
            `No se pudo actualizar la contraseña: ${error.message}`
          );
          return { error };
        }
        // Salir del modo recovery si estaba activo
        this._recoveryMode = false;
        // Cerrar sesión por seguridad y redirigir a /auth
        try {
          this.signOut();
        } catch (e) {
          console.warn(
            "Error al cerrar sesión tras cambio de contraseña:",
            (e as Error).message
          );
        }
        // Mostrar mensaje solicitado y navegar al login
        this.notificationService.showSuccess(
          "Se ha cambiado la clave con exito, ya puede ingresar con la nueva contraseña."
        );
        // Limpiar sesión transitoria
        this._transientSession = null;
        return { error: null };
      })
      .catch((e: unknown) => {
        const err = e as Error;
        return { error: err };
      })
      .finally(() => this.loadingService.hide());
  }

  /**
   * Verifica un código de recuperación (reset password) manual ingresado por el usuario.
   * Si es válido, queda una sesión de recovery activa para permitir `updateUser({ password })`.
   */
  verifyRecoveryCode(
    email: string,
    token: string
  ): Promise<{ error: Error | null; verified: boolean }> {
    this.loadingService.show();
    return this.supabase.auth
      .verifyOtp({ email, token, type: "recovery" })
      .then(({ data, error }) => {
        if (error) {
          this.notificationService.showError(
            `Código inválido o expirado: ${error.message}`
          );
          return { error, verified: false };
        }
        // Guardar sesión temporal (no persistente) para permitir reset de contraseña
        this._transientSession = data.session ?? null;
        this.notificationService.showSuccess(
          "Código verificado. Continúa para crear una nueva contraseña."
        );
        return { error: null, verified: true };
      })
      .finally(() => this.loadingService.hide());
  }

  /**
   * Ejecuta una acción que requiere que el cliente supabase tenga la sesión activa.
   * Se establece la sesión proporcionada temporalmente en el cliente, se ejecuta la
   * acción y se restaura la sesión previa (o se limpia) para evitar persistencia accidental.
   */
  private async withTransientSession<T>(session: AuthSession | null, action: () => Promise<T>): Promise<T> {
    const previous = this._session;
    try {
      if (session) {
        // Establecer temporalmente en el cliente (esto escribe en storage)
        await this.supabase.auth.setSession(session as any);
        this._session = session;
      }
      const result = await action();
      return result;
    } finally {
      // Restaurar sesión anterior (o limpiar) para evitar que la session temporal persista
      try {
        if (previous) {
          await this.supabase.auth.setSession(previous as any);
          this._session = previous;
        } else {
          await this.supabase.auth.setSession(null);
          this._session = null;
        }
      } catch (e) {
        console.warn('Error restoring session after transient action', (e as Error).message);
      }
    }
  }
}
