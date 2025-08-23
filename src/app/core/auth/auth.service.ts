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

  //inyeccion de depdencias
  private readonly router = inject(Router);
  private readonly loadingService = inject(LoadingService);
  private readonly notificationService = inject(NotificationService);

  get session() {
    return this._session;
  }

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
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

  signIn(
    email: string,
    password: string
  ): Promise<{ user: User | null; error: Error | null }> {
    this.loadingService.show();
    return this.supabase.auth
      .signInWithPassword({ email, password })
      .then(({ data, error }) => {
        this._session = data.session;

        // Mostrar mensaje de error si existe
        if (error) {
          this.notificationService.showError(
            `Error al iniciar sesión: ${error.message}`
          );
        } else {
          this.notificationService.showSuccess("Inicio de sesión exitoso");
        }

        return { user: data.user, error };
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
   * y no estará disponible hasta que se complete el proceso de verificación.
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
          this.notificationService.showError(
            `Error al enviar código: ${error.message}`
          );
        } else {
          this.notificationService.showSuccess("Código enviado al correo");
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

        // Guardar sesión temporal para el siguiente paso
        this._session = data.session;
        // Actualizar metadata para reflejar avance del onboarding
        return this.supabase.auth
          .updateUser({
            data: {
              onboarding_step: "otp_verified",
            },
          })
          .then(({ error: updateError }) => {
            if (updateError) {
              // No es crítico, solo avisamos
              this.notificationService.showError(
                `Código verificado pero fallo metadata: ${updateError.message}`
              );
            } else {
              this.notificationService.showSuccess(
                "Código verificado exitosamente"
              );
            }
            return { error: updateError ?? error, verified: true };
          });
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
    numeroDocumento: number,
    email: string,
    password: string
  ): Promise<{ user: User | null; error: Error | null }> {
    this.loadingService.show();
    // Debe existir una sesión previa (resultado de verifyEmailCode) para poder
    // establecer password con updateUser. Si no, retornamos error.
    if (!this._session) {
      const err = new Error(
        "Sesión no encontrada. Verifique el código antes de crear la contraseña."
      );
      this.notificationService.showError(err.message);
      this.loadingService.hide();
      return Promise.resolve({ user: null, error: err });
    }

    return this.supabase.auth
      .updateUser({
        password,
        data: {
          numeroDocumento,
          onboarding_step: "completed",
        },
      })
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
        return { user: data?.user ?? null, error: null };
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
        this._session = null;
        this.router.navigate(["/auth"]); // Redirigir al login después de cerrar sesión
        return { error };
      })
      .finally(() => {
        this.loadingService.hide();
      });
  }

  /**
   * TODO: esto es responsabilidad del backend
   * Actualiza la metadata del usuario autenticado agregando el idPersona
   * retornado por el backend al crear la información personal.
   *
   * @param idPersona ID de la persona creada en el backend
   * @returns Promise con posible error
   */
  updatePersonaId(idPersona: number): Promise<{ error: Error | null }> {
    this.loadingService.show();

    if (!this._session) {
      const error = new Error("No hay sesión activa para actualizar metadata.");
      this.notificationService.showError(error.message);
      this.loadingService.hide();
      return Promise.resolve({ error });
    }

    return this.supabase.auth
      .updateUser({
        data: {
          // Se agrega / sobreescribe idPersona. Supabase hace merge de metadata existente.
          idPersona,
        },
      })
      .then(({ error }) => {
        if (error) {
          this.notificationService.showError(
            `Error al actualizar metadata: ${error.message}`
          );
          return { error };
        }
        this.notificationService.showSuccess(
          "Metadata actualizada (idPersona agregado)."
        );
        return { error: null };
      })
      .finally(() => this.loadingService.hide());
  }
}
