import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { PersonaDto, PersonaCreateDto, PersonaUpdateDto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InformacionPersonalService {
  private readonly apiUrl = `${environment.hojaDeVidaApiUrl}/persona`;
  
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la información personal de una persona por ID
   * @param id ID de la persona
   * @returns Observable con los datos de la persona
   */
  obtenerInformacionPersonal(id: number): Observable<PersonaDto> {
    return this.http.get<PersonaDto>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Obtiene toda la información personal disponible
   * @returns Observable con lista de personas
   */
  obtenerTodasLasPersonas(): Observable<PersonaDto[]> {
    return this.http.get<PersonaDto[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Crea una nueva persona con su información personal
   * @param persona Datos de la persona a crear
   * @returns Observable con la persona creada
   */
  crearInformacionPersonal(persona: PersonaCreateDto): Observable<PersonaDto> {
    return this.http.post<PersonaDto>(this.apiUrl, persona, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Actualiza la información personal de una persona existente
   * @param persona Datos actualizados de la persona
   * @returns Observable con la persona actualizada
   */
  actualizarInformacionPersonal(persona: PersonaUpdateDto): Observable<PersonaDto> {
    return this.http.put<PersonaDto>(`${this.apiUrl}/${persona.id}`, persona, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Elimina la información personal de una persona
   * @param id ID de la persona a eliminar
   * @returns Observable vacío
   */
  eliminarInformacionPersonal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Busca personas por criterios específicos
   * @param numeroDocumento Número de documento para buscar
   * @returns Observable con la persona encontrada
   */
  buscarPorDocumento(numeroDocumento: string): Observable<PersonaDto> {
    return this.http.get<PersonaDto>(`${this.apiUrl}/buscar/documento/${numeroDocumento}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Valida si un número de documento ya existe
   * @param numeroDocumento Número de documento a validar
   * @returns Observable con booleano indicando si existe
   */
  validarDocumentoExistente(numeroDocumento: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/validar-documento/${numeroDocumento}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Valida si un correo electrónico ya existe
   * @param correoElectronico Correo electrónico a validar
   * @returns Observable con booleano indicando si existe
   */
  validarCorreoExistente(correoElectronico: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/validar-correo/${encodeURIComponent(correoElectronico)}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Maneja errores HTTP
   * @param error Error HTTP
   * @returns Observable con error formateado
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Ha ocurrido un error inesperado';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 400:
          errorMessage = 'Datos inválidos. Por favor, revise la información ingresada.';
          break;
        case 401:
          errorMessage = 'No tiene autorización para realizar esta acción.';
          break;
        case 404:
          errorMessage = 'La información solicitada no fue encontrada.';
          break;
        case 409:
          errorMessage = 'Ya existe un registro con estos datos.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor. Intente más tarde.';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }
    
    console.error('Error en InformacionPersonalService:', error);
    return throwError(() => new Error(errorMessage));
  }
}