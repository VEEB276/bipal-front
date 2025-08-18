import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { hojaDeVidaCanActivateChild } from "./core/auth/hoja-de-vida-auth.guard";
import { AuthenticationComponent } from "./modules/auth/authentication.component";
import { CrearUsuarioComponent } from "./modules/auth/components/crear-usuario/crear-usuario.component";
import { FullContainerAuthComponent } from "./modules/auth/components/full-container-auth/full-container-auth.component";
import { userRedirectAutenticated } from "./core/auth/auth-user.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
  {
    path: "auth",
    canActivate: [userRedirectAutenticated],
    component: AuthenticationComponent,
    children: [
      {
        path: "",
        component: FullContainerAuthComponent,
      },
      {
        path: "crear-usuario",
        component: CrearUsuarioComponent,
      },
    ],
  },
  {
    path: "hoja-de-vida",
    component: LayoutComponent,
    canActivateChild: [hojaDeVidaCanActivateChild],
    loadChildren: () =>
      import("./modules/hojadevida/hojadevida.routes").then(
        (m) => m.HOJA_DE_VIDA_ROUTES
      ),
  },
];
