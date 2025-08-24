import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { EstudioHvDto, EstudioHvCreateDto, EstudioHvUpdateDto, NivelEducativoDto } from '../interfaces/perfil-academico.interface';
import { NotificationService } from '../../../../../core/services/notification.service';

/**
 * Servicio para gestionar los estudios (EstudioHV) asociados a la hoja de vida de una persona.
 * Endpoints basados en EstudioHVController (backend):
 *  - POST   /api/estudio-hv/create-estudios
 *  - PUT    /api/estudio-hv/actualizar-estudio
 *  - GET    /api/estudio-hv/find-by-id-estudio/{id}
 *  - GET    /api/estudio-hv/search-all-nivel-educativo
 *  - DELETE /api/estudio-hv/eliminar-estudio-hv/{id}
 *  - GET    /api/estudio-hv/search-estudios-by-id-persona/{idPersona}
 */
@Injectable({ providedIn: 'root' })
export class EstudiosHvService {
  private readonly apiUrl = `${environment.hojaDeVidaApiUrl}/estudio-hv`;
  private readonly http = inject(HttpClient);
  private readonly notification = inject(NotificationService);

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Crea una lista de estudios (bulk create)
   */
  crearEstudios(estudios: EstudioHvCreateDto[]): Observable<EstudioHvDto[]> {
    return this.http
      .post<EstudioHvDto[]>(`${this.apiUrl}/create-estudios`, estudios, this.httpOptions)
      .pipe(
        tap(() => this.notification.showSuccess('Se ha guardado los estudios exitosamente.')),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Actualiza una lista de estudios (según backend reutiliza create)
   */
  actualizarEstudios(estudios: EstudioHvUpdateDto[]): Observable<EstudioHvDto[]> {
    return this.http
      .put<EstudioHvDto[]>(`${this.apiUrl}/actualizar-estudio`, estudios, this.httpOptions)
      .pipe(
        tap(() => this.notification.showSuccess('Se ha actualizado los estudios con éxito.')),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Obtiene un estudio por su id
   */
  obtenerEstudioPorId(id: number): Observable<EstudioHvDto> {
    return this.http
      .get<EstudioHvDto>(`${this.apiUrl}/find-by-id-estudio/${id}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  /**
   * Elimina un estudio por id (retorna boolean en backend, lo mapeamos a boolean)
   */
  eliminarEstudio(id: number): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.apiUrl}/eliminar-estudio-hv/${id}`)
      .pipe(
        tap((ok) => { if (ok) this.notification.showSuccess('Se ha borrado satisfactoriamente el estudio.'); }),
        catchError(this.handleError.bind(this))
      );
  }

  /**
   * Lista todos los niveles educativos (catálogo)
   */
  obtenerNivelesEducativos(): Observable<NivelEducativoDto[]> {
    return this.http
      .get<NivelEducativoDto[]>(`${this.apiUrl}/search-all-nivel-educativo`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  /**
   * Obtiene todos los estudios de una persona por su idPersona
   */
  obtenerEstudiosPorPersona(idPersona: number): Observable<EstudioHvDto[]> {
    return this.http
      .get<EstudioHvDto[]>(`${this.apiUrl}/search-estudios-by-id-persona/${idPersona}`)
      .pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(error: any) {
    let errorMessage = 'Ha ocurrido un error inesperado';
    if (error?.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error) {
      switch (error.status) {
        case 400:
          errorMessage = 'Solicitud inválida.';
          break;
        case 401:
          errorMessage = 'No autorizado.';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado.';
          break;
        case 409:
          errorMessage = 'Conflicto de datos (duplicado).';
          break;
        case 500:
          errorMessage = 'Error interno del servidor.';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }
    this.notification.showError(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
