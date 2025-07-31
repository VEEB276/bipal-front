import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  /**
   * Muestra un mensaje de error en un SnackBar
   * @param message - Mensaje de error a mostrar
   * @param duration - Duración en milisegundos (por defecto 5 segundos)
   */
  showError(message: string, duration: number = 5000): void {
    this.snackBar.open(message, 'Cerrar', {
      duration,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  /**
   * Muestra un mensaje de éxito en un SnackBar
   * @param message - Mensaje de éxito a mostrar
   * @param duration - Duración en milisegundos (por defecto 3 segundos)
   */
  showSuccess(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Cerrar', {
      duration,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  /**
   * Muestra un mensaje informativo en un SnackBar
   * @param message - Mensaje informativo a mostrar
   * @param duration - Duración en milisegundos (por defecto 3 segundos)
   */
  showInfo(message: string, duration: number = 3000): void {
    this.snackBar.open(message, 'Cerrar', {
      duration,
      panelClass: ['info-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  /**
   * Muestra un mensaje de advertencia en un SnackBar
   * @param message - Mensaje de advertencia a mostrar
   * @param duration - Duración en milisegundos (por defecto 4 segundos)
   */
  showWarning(message: string, duration: number = 4000): void {
    this.snackBar.open(message, 'Cerrar', {
      duration,
      panelClass: ['warning-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
