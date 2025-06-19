import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { AuthLoginComponent } from "./modules/auth-login/auth-login.component";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "auth",
        pathMatch: "full"
    },
  {
    path: "auth",
    component: AuthLoginComponent
  },
  {
    path: "hoja-de-vida",
    component: LayoutComponent,
    //children: [{}],
  },
];
