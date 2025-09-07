import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment';
import { NotificationService } from '../../../../../core/services/notification.service';
import { OtroEstudioHvDto, OtroEstudioHvCreateDto, OtroEstudioHvUpdateDto } from '../interfaces/otros-estudios.interface';
// Upsert admite id opcional (cuando viene id se actualiza en backend)
export type OtroEstudioHvUpsertDto = Partial<OtroEstudioHvDto> & { idHojaVida: number };

@Injectable({ providedIn: 'root' })
export class OtrosEstudiosService {
  private readonly apiUrl = `${environment.hojaDeVidaApiUrl}/otro-estudio-hv`;
  private readonly http = inject(HttpClient);
  private readonly notification = inject(NotificationService);


  crearOtrosEstudios(estudios: (OtroEstudioHvCreateDto | OtroEstudioHvUpsertDto | OtroEstudioHvDto)[]): Observable<OtroEstudioHvDto[]> {
    return this.http
      .post<OtroEstudioHvDto[]>(`${this.apiUrl}/create-otro-estudio`, estudios)
      .pipe(
        tap(() => this.notification.showSuccess('Se han guardado los otros estudios satisfactoriamente.')),
        catchError(this.handleError)
      );
  }

  actualizarOtroEstudio(estudio: OtroEstudioHvUpdateDto): Observable<OtroEstudioHvDto> {
    return this.http
      .put<OtroEstudioHvDto>(`${this.apiUrl}/actualizar-otro-estudio`, estudio)
      .pipe(
        tap(() => this.notification.showSuccess('Se ha actualizado el estudio.')),
        catchError(this.handleError)
      );
  }

  obtenerOtroEstudioPorId(id: number): Observable<OtroEstudioHvDto> {
    return this.http
      .get<OtroEstudioHvDto>(`${this.apiUrl}/find-by-id-otro-estudio/${id}`)
      .pipe(catchError(this.handleError));
  }

  eliminarOtroEstudio(id: number): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.apiUrl}/eliminar-otro-estudio-hv/${id}`)
      .pipe(
        tap(ok => { if (ok) this.notification.showSuccess('Estudio eliminado.'); }),
        catchError(this.handleError)
      );
  }

  obtenerOtrosEstudiosPorPersona(idPersona: number): Observable<OtroEstudioHvDto[]> {
    return this.http
      .get<OtroEstudioHvDto[]>(`${this.apiUrl}/search-otros-estudios-by-id-persona/${idPersona}`)
      .pipe(catchError(this.handleError));
  }

  private handleError = (error: any) => {
    let errorMessage = 'Ha ocurrido un error inesperado';
    if (error?.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else if (error) {
      switch (error.status) {
        case 400: errorMessage = 'Solicitud inválida.'; break;
        case 401: errorMessage = 'No autorizado.'; break;
        case 404: errorMessage = 'Recurso no encontrado.'; break;
        case 409: errorMessage = 'Conflicto de datos.'; break;
        case 500: errorMessage = 'Error interno del servidor.'; break;
        default: errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }
    this.notification.showError(errorMessage);
    return throwError(() => new Error(errorMessage));
  };
}
