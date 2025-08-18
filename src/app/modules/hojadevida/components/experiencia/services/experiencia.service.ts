import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { NotificationService } from '../../../../../core/services';
import { catchError, map, throwError } from 'rxjs';
import { ExperienciaHvDto, TipoExperienciaDto, UpsertExperienciaHvDto } from '../interfaces/experiencia.interface';

@Injectable({ providedIn: 'root' })
export class ExperienciaService {
  private readonly http = inject(HttpClient);
  private readonly notify = inject(NotificationService);
  private readonly baseUrl = environment.hojaDeVidaApiUrl + '/experiencia-hv';

  buscarTiposExperiencia() {
    return this.http.get<TipoExperienciaDto[]>(`${this.baseUrl}/search-all-tipo-experiencia`).pipe(
      map(list => list.filter(t => t.habilitado)),
      catchError(err => this.handleError(err, 'No fue posible cargar los tipos de experiencia'))
    );
  }

  obtenerExperienciasPorPersona(idPersona: number) {
    return this.http.get<ExperienciaHvDto[]>(`${this.baseUrl}/search-experiencias-by-id-persona/${idPersona}`).pipe(
      catchError(err => this.handleError(err, 'No fue posible cargar experiencias'))
    );
  }

  crearExperiencias(lista: UpsertExperienciaHvDto[]) {
    return this.http.post<ExperienciaHvDto[]>(`${this.baseUrl}/create-experiencia`, this.serializarFechas(lista)).pipe(
      catchError(err => this.handleError(err, 'No fue posible guardar experiencias'))
    );
  }

  eliminarExperiencia(id: number) {
    return this.http.delete<boolean>(`${this.baseUrl}/eliminar-experiencia-hv/${id}`).pipe(
      catchError(err => this.handleError(err, 'No fue posible eliminar la experiencia'))
    );
  }

  private serializarFechas(lista: UpsertExperienciaHvDto[]) {
    return lista.map(e => ({
      ...e,
      fechaDesde: e.fechaDesde ? this.formatFecha(e.fechaDesde) : null,
      fechaHasta: e.fechaHasta ? this.formatFecha(e.fechaHasta) : null
    }));
  }

  private formatFecha(f: Date | string) {
    if (!f) return null;
    if (typeof f === 'string') return f;
    return f.toISOString().split('T')[0];
  }

  private handleError(error: any, userMessage: string) {
  console.error(error);
  this.notify.showError(userMessage);
    return throwError(() => error);
  }
}
