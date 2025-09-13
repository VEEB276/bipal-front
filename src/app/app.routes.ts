import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { hojaDeVidaCanActivateChild } from "./modules/hojadevida/guard/hoja-de-vida-auth.guard";
import { AuthenticationComponent } from "./modules/auth/authentication.component";
import { CrearUsuarioComponent } from "./modules/auth/components/crear-usuario/crear-usuario.component";
import { FullContainerAuthComponent } from "./modules/auth/components/full-container-auth/full-container-auth.component";
import { userRedirectAutenticated } from "./core/auth/auth-user.guard";
import { ResetPaswordComponentComponent } from "./modules/auth/components/reset-password/reset-pasword-component.component";
import { ModalRecuperarCuentaComponent } from "./modules/auth/components/modal-recuperar-cuenta/modal-recuperar-cuenta.component";
import { ComprobarCodigoComponent } from "./modules/auth/components/comprobar-codigo/comprobar-codigo.component";

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
        path: "crear-usuario",
        component: CrearUsuarioComponent,
      },
      {
        path: "recuperar-contrasena",
        component: ModalRecuperarCuentaComponent,
      },
      {
        path:"resetear-contraseña",
        component: ResetPaswordComponentComponent,
      },
      {
        path:"comprobar-codigo",
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
