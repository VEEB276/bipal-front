import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export type NotificationType = 'success' | 'error' | 'warning';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Shows a notification message with specified type
   * @param message The message to display
   * @param type The type of notification (success, error, warning)
   * @param duration Duration in milliseconds (default: 5000)
   */
  showMessage(
    message: string, 
    type: NotificationType = 'success', 
    duration: number = 5000
  ): void {
    const config: MatSnackBarConfig = {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [`snackbar-${type}`]
    };

    this.snackBar.open(message, 'Cerrar', config);
  }

  /**
   * Shows a success notification
   * @param message The message to display
   * @param duration Duration in milliseconds (default: 5000)
   */
  showSuccess(message: string, duration: number = 5000): void {
    this.showMessage(message, 'success', duration);
  }

  /**
   * Shows an error notification
   * @param message The message to display
   * @param duration Duration in milliseconds (default: 5000)
   */
  showError(message: string, duration: number = 5000): void {
    this.showMessage(message, 'error', duration);
  }

  /**
   * Shows a warning notification
   * @param message The message to display
   * @param duration Duration in milliseconds (default: 5000)
   */
  showWarning(message: string, duration: number = 5000): void {
    this.showMessage(message, 'warning', duration);
  }
}