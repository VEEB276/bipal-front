import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";
import { LoadingService } from "../services";

/**
 * Guard that redirects authenticated users away from the login page.
 */
export const userRedirectAutenticated: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const loading = inject(LoadingService);

  loading.show();
  return auth
    .getSession()
    .then((isAuthenticated) => {
      console.log("isAuthenticated", isAuthenticated);
      if (isAuthenticated) {
        return router.navigate(["/hoja-de-vida/personal"]);
      } else {
        return true;
      }
    })
    .catch((error) => {
      console.error("Error checking authentication", error);
      return true;
    })
    .finally(() => {
      loading.hide();
    });
};
