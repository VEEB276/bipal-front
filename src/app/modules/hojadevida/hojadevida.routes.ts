import { Routes } from "@angular/router";

export const HOJA_DE_VIDA_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./section-container-hv/section-container-hv.component").then(
        (c) => c.SectionContainerHvComponent
      ),
  },
];
