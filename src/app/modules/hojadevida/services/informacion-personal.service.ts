import { inject, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import { PersonaDto, PersonaCreateDto, PersonaUpdateDto } from "../models";
import { AuthService } from "../../../core/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class InformacionPersonalService {
  private readonly apiUrl = `${environment.hojaDeVidaApiUrl}/persona`;

  private readonly httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  private readonly auth = inject(AuthService);

  constructor(private readonly http: HttpClient) {}

  /**
   * Obtiene la información personal de una persona por ID
   * @param id ID de la persona
   * @returns Observable con los datos de la persona
   */
  obtenerInformacionPersonal(id: number): Observable<PersonaDto> {
    // Endpoint backend: GET /api/persona/find-by-id-persona/{id}
    return this.http
      .get<PersonaDto>(`${this.apiUrl}/find-by-id-persona/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Obtiene toda la información personal disponible
   * @returns Observable con lista de personas
   */
  // NOTE: Endpoint no implementado en backend (listar todas las personas)
  obtenerTodasLasPersonas(): Observable<PersonaDto[]> {
    return this.http
      .get<PersonaDto[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  /**
   * Crea una nueva persona con su información personal
   * @param persona Datos de la persona a crear
   * @returns Observable con la persona creada
   */
  crearInformacionPersonal(persona: PersonaCreateDto): Observable<PersonaDto> {
    // Endpoint backend: POST /api/persona/create-persona
    return this.http
      .post<PersonaDto>(
        `${this.apiUrl}/create-persona`,
        persona,
        this.httpOptions
      )
      .pipe(
        tap((resp) => {
          //TODO: esto deberia hacerlo el backend
          // aqui solo se deberia actualizar el id de la persona en la sesion getSession()
          this.auth.updatePersonaId(resp.id).then(() => this.auth.getSession());
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Actualiza la información personal de una persona existente
   * @param persona Datos actualizados de la persona
   * @returns Observable con la persona actualizada
   */
  actualizarInformacionPersonal(
    persona: PersonaUpdateDto
  ): Observable<PersonaDto> {
    // Endpoint backend: PUT /api/persona/actualizar-persona (id enviado en el body)
    return this.http
      .put<PersonaDto>(
        `${this.apiUrl}/actualizar-persona`,
        persona,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * Elimina la información personal de una persona
   * @param id ID de la persona a eliminar
   * @returns Observable vacío
   */
  // NOTE: Endpoint eliminar persona no existe aún en backend
  eliminarInformacionPersonal(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Busca personas por numero de documento.
   * @param numeroDocumento Número de documento para buscar
   * @returns Observable con la persona encontrada
   */
  // NOTE: Endpoint buscar por documento no existe aún en backend
  buscarPorDocumento(numeroDocumento: string): Observable<PersonaDto> {
    return this.http
      .get<PersonaDto>(`${this.apiUrl}/find?numero-documento=${numeroDocumento}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Valida si un número de documento ya existe
   * @param numeroDocumento Número de documento a validar
   * @returns Observable con booleano indicando si existe
   */
  // NOTE: Endpoint validar documento no existe aún en backend
  validarDocumentoExistente(numeroDocumento: string): Observable<boolean> {
    return this.http
      .get<boolean>(`${this.apiUrl}/validar-documento/${numeroDocumento}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Valida si un correo electrónico ya existe
   * @param correoElectronico Correo electrónico a validar
   * @returns Observable con booleano indicando si existe
   */
  // NOTE: Endpoint validar correo no existe aún en backend
  validarCorreoExistente(correoElectronico: string): Observable<boolean> {
    return this.http
      .get<boolean>(
        `${this.apiUrl}/validar-correo/${encodeURIComponent(correoElectronico)}`
      )
      .pipe(catchError(this.handleError));
  }

  // Métodos agregados según endpoints existentes en PersonaController

  /**
   * Obtiene todos los tipos de documento
   * Endpoint backend: GET /api/persona/search-all-tipo-documento
   */
  obtenerTiposDocumento(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/search-all-tipo-documento`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Obtiene todos los géneros
   * Endpoint backend: GET /api/persona/search-all-sexo
   */
  obtenerGeneros(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/search-all-sexo`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Obtiene todos los enfoques diferenciales
   * Endpoint backend: GET /api/persona/search-all-enfoque-diferencial
   */
  obtenerEnfoquesDiferenciales(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/search-all-enfoque-diferencial`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Busca departamentos y municipios opcionalmente filtrados
   * Endpoint backend: GET /api/persona/search-all-departamento-municipio?query=...
   * @param query texto a filtrar (opcional)
   */
  buscarDepartamentosMunicipios(query?: string): Observable<any[]> {
    let params = new HttpParams();
    if (query) {
      params = params.set("query", query);
    }
    return this.http
      .get<any[]>(`${this.apiUrl}/search-all-departamento-municipio`, {
        params,
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * Maneja errores HTTP
   * @param error Error HTTP
   * @returns Observable con error formateado
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = "Ha ocurrido un error inesperado";

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 400:
          errorMessage =
            "Datos inválidos. Por favor, revise la información ingresada.";
          break;
        case 401:
          errorMessage = "No tiene autorización para realizar esta acción.";
          break;
        case 404:
          errorMessage = "La información solicitada no fue encontrada.";
          break;
        case 409:
          errorMessage = "Ya existe un registro con estos datos.";
          break;
        case 500:
          errorMessage = "Error interno del servidor. Intente más tarde.";
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }

    console.error("Error en InformacionPersonalService:", error);
    return throwError(() => new Error(errorMessage));
  }
}
