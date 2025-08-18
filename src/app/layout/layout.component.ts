import { Component, inject, signal, computed } from "@angular/core";
import { RouterOutlet, RouterModule, Router } from "@angular/router";
import { BreakpointObserver } from "@angular/cdk/layout";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { CommonModule } from "@angular/common";
import { MatTooltipModule } from "@angular/material/tooltip";
import { AuthService } from "../core/auth/auth.service";
import { ConfirmDialogService } from "../core/services";

interface MenuItem {
  label: string;
  icon: string;
  url?: string; // ruta de navegación
  action?: () => void; // acción opcional en lugar de navegar
  children?: MenuItem[]; // futuro soporte submenús
}

@Component({
  selector: "app-layout",
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatTooltipModule,
  ],
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);
  private auth = inject(AuthService);
  private readonly confirm = inject(ConfirmDialogService);

  isCollapsed = signal(false);
  isMobile = signal(false);

  currentUrl = signal<string>("");

  constructor() {
    // Detectar móvil y actualizar signals
    this.breakpointObserver
      .observe(["(max-width: 768px)"])
      .subscribe((result) => {
        this.isMobile.set(result.matches);
        if (result.matches) {
          this.isCollapsed.set(false);
        }
      });

    // Escuchar cambios de ruta
    this.router.events.subscribe(() => {
      this.currentUrl.set(this.router.url);
    });
    // Inicial
    this.currentUrl.set(this.router.url);

    const collapsed = localStorage.getItem('bipal.sidenav-collapsed');
    if(collapsed) {
      this.isCollapsed.set(collapsed === 'true');
    }
  }

  // Computed signals simplificados
  sidenavMode = computed(() => (this.isMobile() ? "over" : "side"));
  sidenavOpened = computed(() => !this.isMobile());
  hasBackdrop = computed(() => this.isMobile());

  // Menús principales
  menuItems: MenuItem[] = [
    {
      label: "Mi hoja de vida",
      icon: "folder_managed",
      url: "/hoja-de-vida/personal",
    },
  ];

  // Menús de cuenta
  accountMenuItems: MenuItem[] = [
    {
      label: "Eliminar mis datos",
      icon: "delete_forever",
      url: "/hoja-de-vida/eliminar-datos",
    },
    {
      label: "Términos y condiciones",
      icon: "description",
      url: "/hoja-de-vida/terminos-condiciones",
    },
    {
      label: "Cerrar sesión",
      icon: "logout",
      action: () => {
        this.confirm.open({
          title: "Confirmar cierre de sesión",
          message: "¿Estás seguro de que deseas cerrar sesión?",
          type: 'warning',
          primaryText: "Cerrar sesión",
          secondaryText: "Cancelar",
        }).subscribe((ok) => {
          if (!ok) return;
          this.cerrarSesion();
        });
      },
    },
  ];

  isActive = (item: MenuItem) =>
    !!item.url && this.currentUrl().startsWith(item.url);

  handleItemClick(item: MenuItem) {
    if (item.action) {
      item.action();
      return;
    }
    if (item.url) {
      this.router.navigate([item.url]);
    }
  }

  toggleSidenav() {
    this.isCollapsed.update((collapsed) => !collapsed);
    localStorage.setItem('bipal.sidenav-collapsed', this.isCollapsed() ? 'true' : 'false');
  }

  // Métodos de acción simplificados
  private cerrarSesion() {
    this.auth.signOut().then(() => {
      this.router.navigate(["/auth"]);
    });
  }
}
