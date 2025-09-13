import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { hojaDeVidaCanActivateChild } from "./modules/hojadevida/guard/hoja-de-vida-auth.guard";
import { AuthenticationComponent } from "./modules/auth/authentication.component";
import { ContainerAuthComponent } from "./modules/auth/components/container-auth/container-auth.component";
import { FullContainerAuthComponent } from "./modules/auth/components/full-container-auth/full-container-auth.component";
import { userRedirectAutenticated } from "./core/auth/auth-user.guard";
import { ResetPaswordComponentComponent } from "./modules/auth/pages/reset-password/reset-pasword-component.component";
import { RecuperarCuentaComponent } from "./modules/auth/components/recuperar-cuenta/recuperar-cuenta.component";
import { ComprobarCodigoComponent } from "./modules/auth/components/comprobar-codigo/comprobar-codigo.component";
import { CrearClaveComponent } from "./modules/auth/pages/crear-clave/crear-clave.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
  {
    path: "terminos-condiciones",
    data: {
      backButton: true
    },
    loadComponent: () =>
      import(
        "./modules/hojadevida/pages/terminos-condiciones/terminos-condiciones.component"
      ).then((m) => m.TerminosCondicionesComponent),
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
        path: "recuperar-contrasena",
        component: RecuperarCuentaComponent,
      },
      {
        path:"reset-password",
        component: ResetPaswordComponentComponent,
      },
      {
        path: "comprobar-codigo",
        component: ComprobarCodigoComponent,
      },
      {
        path: "crear-clave",
        component: CrearClaveComponent,
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
