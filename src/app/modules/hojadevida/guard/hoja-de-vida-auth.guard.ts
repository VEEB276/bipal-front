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
    if (auth.session) {
      return true;
    }
    notifier.showInfo("Debe iniciar sesión para continuar");
    return router.createUrlTree(["/auth"]);
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
