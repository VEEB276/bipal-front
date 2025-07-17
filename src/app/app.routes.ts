import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { AuthenticationComponent } from "./modules/auth/authentication/authentication.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
  {
    path: "auth",
    component: AuthenticationComponent,
  },
  {
    path: "hoja-de-vida",
    component: LayoutComponent,
    loadChildren: () =>
      import("./modules/hojadevida/hojadevida.routes").then(
        (m) => m.HOJA_DE_VIDA_ROUTES
      ),
  },
];
