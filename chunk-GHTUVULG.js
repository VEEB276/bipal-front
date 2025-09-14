import {
  AuthService,
  NotificationService,
  Store,
  createActionGroup,
  createFeature,
  createReducer,
  createSelector,
  emptyProps,
  environment,
  on,
  props
} from "./chunk-JOCNUMAS.js";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  Injectable,
  catchError,
  inject,
  map,
  setClassMetadata,
  tap,
  throwError,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-52XVDXSC.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-UGR6JUJC.js";

// src/app/modules/hojadevida/store/feature/hojavida.actions.ts
var HojavidaActions = createActionGroup({
  source: "Hojavida",
  events: {
    "Load Persona": props(),
    "Load Persona Success": props(),
    "Load Persona Failure": props(),
    "Clear Persona": emptyProps(),
    "Update Persona In State": props()
  }
});

// src/app/modules/hojadevida/store/feature/hojavida.reducer.ts
var HOJAVIDA_FEATURE_KEY = "hojavida";
var initialState = {
  persona: null,
  loadingPersona: false,
  errorPersona: null
};
var reducer = createReducer(initialState, on(HojavidaActions.loadPersona, (state) => __spreadProps(__spreadValues({}, state), {
  loadingPersona: true,
  errorPersona: null
})), on(HojavidaActions.loadPersonaSuccess, (state, { persona }) => __spreadProps(__spreadValues({}, state), {
  persona,
  loadingPersona: false
})), on(HojavidaActions.loadPersonaFailure, (state, { error }) => __spreadProps(__spreadValues({}, state), {
  loadingPersona: false,
  errorPersona: error
})), on(HojavidaActions.clearPersona, () => initialState), on(HojavidaActions.updatePersonaInState, (state, { persona }) => __spreadProps(__spreadValues({}, state), {
  persona
})));
var hojavidaFeature = createFeature({
  name: HOJAVIDA_FEATURE_KEY,
  reducer
});
var selectIdPersona = createSelector(hojavidaFeature.selectHojavidaState, (state) => state.persona?.id);
var selectIdHojaVida = createSelector(hojavidaFeature.selectHojavidaState, (state) => state.persona?.idHojaVida);
var { name: hojavidaFeatureKey, reducer: hojavidaReducer, selectHojavidaState, selectPersona, selectLoadingPersona, selectErrorPersona } = hojavidaFeature;

// src/app/modules/hojadevida/services/informacion-personal.service.ts
var InformacionPersonalService = class _InformacionPersonalService {
  http;
  apiUrl = `${environment.hojaDeVidaApiUrl}/persona`;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };
  auth = inject(AuthService);
  store = inject(Store);
  constructor(http) {
    this.http = http;
  }
  /**
   * Obtiene la información personal de una persona por ID
   * @param id ID de la persona
   * @returns Observable con los datos de la persona
   */
  obtenerInformacionPersonal(id) {
    return this.http.get(`${this.apiUrl}/find-by-id-persona/${id}`).pipe(catchError(this.handleError));
  }
  /**
   * Obtiene toda la información personal disponible
   * @returns Observable con lista de personas
   */
  // TODO: Endpoint no implementado en backend (listar todas las personas)
  obtenerTodasLasPersonas() {
    return this.http.get(this.apiUrl).pipe(catchError(this.handleError));
  }
  /**
   * Crea una nueva persona con su información personal
   * @param persona Datos de la persona a crear
   * @returns Observable con la persona creada
   */
  crearInformacionPersonal(persona) {
    return this.http.post(`${this.apiUrl}/create-persona`, persona, this.httpOptions).pipe(tap((resp) => {
      this.auth.updatePersonaId(resp.id).then(() => this.auth.getSession());
      this.store.dispatch(HojavidaActions.loadPersonaSuccess({ persona: resp }));
    }), catchError(this.handleError));
  }
  /**
   * Actualiza la información personal de una persona existente
   * @param persona Datos actualizados de la persona
   * @returns Observable con la persona actualizada
   */
  actualizarInformacionPersonal(persona) {
    return this.http.put(`${this.apiUrl}/actualizar-persona`, persona, this.httpOptions).pipe(catchError(this.handleError));
  }
  /**
   * Elimina la información personal de una persona
   * @param id ID de la persona a eliminar
   * @returns Observable vacío
   */
  // TODO: Endpoint eliminar persona no existe aún en backend
  eliminarInformacionPersonal(id) {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }
  /**
   * Busca personas por numero de documento.
   * @param numeroDocumento Número de documento para buscar
   * @returns Observable con la persona encontrada
   */
  // TODO: Endpoint buscar por documento no existe aún en backend
  buscarPorDocumento(numeroDocumento) {
    return this.http.get(`${this.apiUrl}/find?numero-documento=${numeroDocumento}`).pipe(catchError(this.handleError));
  }
  /**
   * Valida si un número de documento ya existe
   * @param numeroDocumento Número de documento a validar
   * @returns Observable con booleano indicando si existe
   */
  // TODO: Endpoint validar documento no existe aún en backend
  validarDocumentoExistente(numeroDocumento) {
    return this.http.get(`${this.apiUrl}/validar-documento/${numeroDocumento}`).pipe(catchError(this.handleError));
  }
  /**
   * Valida si un correo electrónico ya existe
   * @param correoElectronico Correo electrónico a validar
   * @returns Observable con booleano indicando si existe
   */
  // TODO: Endpoint validar correo no existe aún en backend
  validarCorreoExistente(correoElectronico) {
    return this.http.get(`${this.apiUrl}/validar-correo/${encodeURIComponent(correoElectronico)}`).pipe(catchError(this.handleError));
  }
  // Métodos agregados según endpoints existentes en PersonaController
  /**
   * Obtiene todos los tipos de documento
   * Endpoint backend: GET /api/persona/search-all-tipo-documento
   */
  obtenerTiposDocumento() {
    return this.http.get(`${this.apiUrl}/search-all-tipo-documento`).pipe(catchError(this.handleError));
  }
  /**
   * Obtiene todos los géneros
   * Endpoint backend: GET /api/persona/search-all-sexo
   */
  obtenerGeneros() {
    return this.http.get(`${this.apiUrl}/search-all-sexo`).pipe(catchError(this.handleError));
  }
  /**
   * Obtiene todos los enfoques diferenciales
   * Endpoint backend: GET /api/persona/search-all-enfoque-diferencial
   */
  obtenerEnfoquesDiferenciales() {
    return this.http.get(`${this.apiUrl}/search-all-enfoque-diferencial`).pipe(catchError(this.handleError));
  }
  /**
   * Busca departamentos y municipios opcionalmente filtrados
   * Endpoint backend: GET /api/persona/search-all-departamento-municipio?query=...
   * @param query texto a filtrar (opcional)
   */
  buscarDepartamentosMunicipios(query) {
    let params = new HttpParams();
    if (query) {
      params = params.set("query", query);
    }
    return this.http.get(`${this.apiUrl}/search-all-departamento-municipio`, {
      params
    }).pipe(catchError(this.handleError));
  }
  /**
   * Maneja errores HTTP
   * @param error Error HTTP
   * @returns Observable con error formateado
   */
  handleError(error) {
    let errorMessage = "Ha ocurrido un error inesperado";
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = "Datos inv\xE1lidos. Por favor, revise la informaci\xF3n ingresada.";
          break;
        case 401:
          errorMessage = "No tiene autorizaci\xF3n para realizar esta acci\xF3n.";
          break;
        case 404:
          errorMessage = "La informaci\xF3n solicitada no fue encontrada.";
          break;
        case 409:
          errorMessage = "Ya existe un registro con estos datos.";
          break;
        case 500:
          errorMessage = "Error interno del servidor. Intente m\xE1s tarde.";
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }
    console.error("Error en InformacionPersonalService:", error);
    return throwError(() => new Error(errorMessage));
  }
  static \u0275fac = function InformacionPersonalService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _InformacionPersonalService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InformacionPersonalService, factory: _InformacionPersonalService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InformacionPersonalService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{ type: HttpClient }], null);
})();

// src/app/modules/hojadevida/store/persona.guard.ts
var personaPrefetchGuard = () => {
  const auth = inject(AuthService);
  const servicio = inject(InformacionPersonalService);
  const store = inject(Store);
  const notify = inject(NotificationService);
  const idPersona = auth.session?.user.user_metadata.idPersona;
  if (!idPersona)
    return true;
  let alreadyLoaded = false;
  const person = store.selectSignal(selectPersona)();
  alreadyLoaded = !!person && person.id === idPersona;
  if (alreadyLoaded)
    return true;
  store.dispatch(HojavidaActions.loadPersona({ id: idPersona }));
  return servicio.obtenerInformacionPersonal(idPersona).pipe(
    tap({
      next: (persona) => store.dispatch(HojavidaActions.loadPersonaSuccess({ persona })),
      error: (err) => store.dispatch(HojavidaActions.loadPersonaFailure({
        error: err.message || "Error cargando persona"
      }))
    }),
    catchError(() => {
      notify.showError("No fue posible cargar la informaci\xF3n personal, por favor contacte al administrador.");
      return auth.signOut();
    }),
    // En caso de error, deslogear
    map(() => true)
  );
};

export {
  HojavidaActions,
  HOJAVIDA_FEATURE_KEY,
  selectIdPersona,
  selectIdHojaVida,
  hojavidaReducer,
  selectPersona,
  InformacionPersonalService,
  personaPrefetchGuard
};
//# sourceMappingURL=chunk-GHTUVULG.js.map
