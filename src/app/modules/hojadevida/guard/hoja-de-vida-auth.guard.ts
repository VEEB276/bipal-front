import { inject } from "@angular/core";
import {
  CanActivateFn,
  CanActivateChildFn,
  Router,
  UrlTree,
} from "@angular/router";
import { AuthService } from "../../../core/auth/auth.service";
import { NotificationService } from "../../../core/services/notification.service";

async function ensureSessionOrRedirect(): Promise<boolean | UrlTree> {
  console.log("Ensuring session");
  const auth = inject(AuthService);
  const router = inject(Router);
  const notifier = inject(NotificationService);
  try {
    await auth.ensureSessionLoaded();
    if (!auth.session) {
      notifier.showInfo("Debe iniciar sesión para continuar");
      return router.createUrlTree(["/auth"]);
    }

    // Con sesión: revisar si el usuario está en onboarding (aún no completado)
    const { data } = await auth.profile();
    const onboardingStep = (data?.user?.user_metadata as any)?.onboarding_step as
      | "otp_verified"
      | "completed"
      | undefined;
    const emailConfirmedAt = (data?.user as any)?.email_confirmed_at as string | null | undefined;

    if ((onboardingStep && onboardingStep !== "completed") || !emailConfirmedAt) {
      // Redirigir al flujo de creación de clave si aún no termina onboarding
      return router.createUrlTree(["/auth/crear-clave"]);
    }

    return true;
  } catch (e: unknown) {
    console.error("ensureSession error", e);
    notifier.showError("Error verificando sesión");
    return router.createUrlTree(["/auth"]);
  }
}

//TODO: puede que con el activechild baste
export const hojaDeVidaCanActivate: CanActivateFn = () => {
  return ensureSessionOrRedirect();
};

export const hojaDeVidaCanActivateChild: CanActivateChildFn = () => {
  return ensureSessionOrRedirect();
};
