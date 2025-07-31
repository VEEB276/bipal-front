import { inject, Injectable } from "@angular/core";
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

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;

  //inyeccion de depdencias
  private readonly router = inject(Router);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session;
    });
    return this._session;
  }

  profile() {
    return this.supabase.auth.getUser();
  }

  signIn(
    email: string,
    password: string
  ): Promise<{ user: User | null; error: Error | null }> {
    return this.supabase.auth
      .signInWithPassword({ email, password })
      .then(({ data, error }) => {
        this._session = data.session;
        return { user: data.user, error };
      });
  }

  /**
   * Envía un código de verificación al correo electrónico del usuario
   * Este método inicia el proceso de registro enviando un OTP (One Time Password)
   * al email proporcionado. El usuario recibirá un código de 6 dígitos.
   * 
   * NOTA: Este método permite crear el usuario temporalmente para poder enviar el OTP,
   * pero el usuario final se creará posteriormente con createUserAccount()
   *
   * @param email - Dirección de correo electrónico donde se enviará el código
   * @returns Promise con el resultado de la operación (error si falla)
   */
  sendCodeVerification(email: string): Promise<{ error: Error | null }> {
    return this.supabase.auth
      .signInWithOtp({
        email,
        options: {
          shouldCreateUser: true, // Permitir crear usuario temporal para enviar OTP
        },
      })
      .then(({ error }) => {
        return { error };
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
  ): Promise<{ error: Error, verified: boolean }> {
    return this.supabase.auth
      .verifyOtp({
        email,
        token,
        type: "email",
      })
      .then(({ data, error }) => {
        if (error) {
          return { error, verified: false };
        }

        // Guardar sesión temporal para el siguiente paso
        this._session = data.session;
        return { error, verified: true };
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
    return this.supabase.auth
      .signUp({
        email,
        password,
        options: {
          emailRedirectTo: undefined, // No redirigir, ya verificamos el email
          data: {
            numeroDocumento,
          },
        },
      })
      .then(({ data, error }) => {
        if (data.session) {
          this._session = data.session;
        }
        return { user: data.user, error };
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
    return this.supabase.auth.signOut().then(({ error }) => {
      this._session = null;
      this.router.navigate(['/auth']); // Redirigir al login después de cerrar sesión
      return { error };
    });
  }
}
