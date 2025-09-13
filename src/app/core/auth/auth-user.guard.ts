import { CanActivateFn, Router, UrlTree } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import { LoadingService } from "../services";

/**
 * Guard that redirects authenticated users away from the login page.
 */
export const userRedirectAutenticated: CanActivateFn = async (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const loading = inject(LoadingService);

  loading.show();
  try {
    // Asegura tener la sesión actual (si existe)
    const session = await auth.ensureSessionLoaded();
    if (!session) return true; // sin sesión: permitir navegar (por ejemplo login)

    // Permitir permanecer en la ruta de reset de contraseña para evitar bucles y redirecciones no deseadas
    if (state.url.startsWith('/auth/reset-password')) {
      return true;
    }

    // Si hay sesión, revisar si es recovery
    if (auth.isRecoverySession) {
      // Si ya estamos en la ruta objetivo, permitir paso para evitar bucles
      if (state.url.startsWith('/auth/reset-password')) return true;
      // Redirigir devolviendo un UrlTree
      return router.createUrlTree(['/auth/reset-password']);
    }

    // Si hay sesión, revisar metadata para saber si es una sesión de onboarding
    const { data, error } = await auth.profile();
    if (error) {
      console.error("Error obteniendo el perfil del usuario", error);
      // En caso de error al obtener perfil, no bloquear: permitir continuar
      return true;
    }

    const onboardingStep = (data?.user?.user_metadata as any)?.onboarding_step as
      | "otp_verified"
      | "completed"
      | undefined;
      console.log('onboardingStep', onboardingStep);
    const emailConfirmedAt = (data?.user as any)?.email_confirmed_at as string | null | undefined;

    // Si el onboarding NO ha terminado, enviar a crear-clave
    if ((onboardingStep && onboardingStep !== "completed") || !emailConfirmedAt) {
      // Usuario aún está en el flujo de creación de cuenta (ej. crear contraseña)
      if (state.url.startsWith('/auth/crear-clave')) return true; // evitar bucle
      return router.createUrlTree(["/auth/crear-clave"]);
    }

    // Sesión completa: redirigir a la hoja de vida
    return router.createUrlTree(["/hoja-de-vida/personal"]);
  } catch (err) {
    console.error("Error checking authentication", err);
    return true;
  } finally {
    loading.hide();
  }
};
