import { ChangeDetectionStrategy, Component, inject, signal, computed, OnDestroy } from "@angular/core";
import { RouterOutlet, RouterModule } from "@angular/router";
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { AuthService } from "../core/auth/auth.service";

interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  action?: () => void;
  children?: MenuItem[];
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
    MatDividerModule
  ],
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnDestroy {
  private breakpointObserver = inject(BreakpointObserver);
  private readonly authService = inject(AuthService);
  
  isCollapsed = signal(false);
  isMobile = signal(false);
  
  constructor() {
    // Detectar móvil y actualizar signals
    this.breakpointObserver.observe(['(max-width: 768px)']).subscribe(result => {
      this.isMobile.set(result.matches);
      if (result.matches) {
        this.isCollapsed.set(false);
      }
    });
  }
  
  ngOnDestroy() {
    // Angular se encarga del cleanup automáticamente
  }
  
  // Computed signals simplificados
  sidenavMode = computed(() => this.isMobile() ? 'over' : 'side');
  sidenavOpened = computed(() => !this.isMobile());
  hasBackdrop = computed(() => this.isMobile());
  
  // Menús principales
  menuItems: MenuItem[] = [
    {
      label: 'Gestionar',
      icon: 'folder_managed',
      route: '/hojadevida'
    }
  ];
  
  // Menús de cuenta
  accountMenuItems: MenuItem[] = [
    {
      label: 'Eliminar mis datos',
      icon: 'delete_forever',
      action: () => this.eliminarDatos()
    },
    {
      label: 'Términos y condiciones',
      icon: 'description',
      action: () => this.verTerminos()
    },
    {
      label: 'Cerrar sesión',
      icon: 'logout',
      action: () => this.cerrarSesion()
    }
  ];
  
  toggleSidenav() {
    this.isCollapsed.update(collapsed => !collapsed);
  }
  
  // Métodos de acción simplificados
  private eliminarDatos() {
    console.log('Eliminar datos');
  }
  
  private verTerminos() {
    console.log('Ver términos y condiciones');
  }
  
  private cerrarSesion() {
    this.authService.signOut().then(({ error }) => {
      if (error) {
        console.error("Error al cerrar sesión:", error);
      } else {
        console.log("Sesión cerrada correctamente");
        // Redirigir al login o realizar otra acción
      }
    });
  }
}
