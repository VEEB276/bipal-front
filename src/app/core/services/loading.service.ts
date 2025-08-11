import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private loadingCounter = 0;

  /**
   * Observable que indica si hay operaciones de carga en curso
   */
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  /**
   * Muestra el indicador de carga
   * Utiliza un contador para manejar múltiples peticiones simultáneas
   */
  show(): void {
    this.loadingCounter++;
    if (this.loadingCounter === 1) {
      this.loadingSubject.next(true);
    }
  }

  /**
   * Oculta el indicador de carga
   * Solo oculta cuando no hay más peticiones pendientes
   */
  hide(): void {
    if (this.loadingCounter > 0) {
      this.loadingCounter--;
    }
    
    if (this.loadingCounter === 0) {
      this.loadingSubject.next(false);
    }
  }

  /**
   * Fuerza el ocultamiento del loading (útil para casos de error críticos)
   */
  forceHide(): void {
    this.loadingCounter = 0;
    this.loadingSubject.next(false);
  }

  /**
   * Obtiene el estado actual del loading
   */
  get isLoading(): boolean {
    return this.loadingSubject.value;
  }
}
