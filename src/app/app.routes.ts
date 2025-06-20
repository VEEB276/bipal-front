import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
  // {
  //   path: "auth",
  //   component: AuthLoginComponent,
  // },
  {
    path: "hoja-de-vida",
    component: LayoutComponent,
    loadChildren: () =>
      import("./modules/hojadevida/hojadevida.routes").then(
        (m) => m.HOJA_DE_VIDA_ROUTES
      ),
  },
];
