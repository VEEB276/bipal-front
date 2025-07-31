import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="loading-overlay" *ngIf="loading$ | async">
      <div class="loading-container">
        <mat-spinner diameter="60" strokeWidth="4"></mat-spinner>
        <p class="loading-text">Procesando...</p>
      </div>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      backdrop-filter: blur(2px);
    }

    .loading-container {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      min-width: 200px;
    }

    .loading-text {
      margin: 0;
      color: #666;
      font-size: 1rem;
      font-weight: 500;
    }

    mat-spinner {
      --mdc-circular-progress-active-indicator-color: #1976d2;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .loading-container {
      animation: fadeIn 0.3s ease-out;
    }
  `]
})
export class LoadingComponent {
  private readonly loadingService = inject(LoadingService);
  
  /**
   * Observable que indica si se debe mostrar el loading
   */
  loading$: Observable<boolean> = this.loadingService.loading$;
}
