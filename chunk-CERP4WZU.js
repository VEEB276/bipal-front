import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-BYQETCUD.js";
import {
  AuthService,
  ConfirmDialogService,
  NotificationService,
  Store,
  environment,
  selectIdPersona
} from "./chunk-FGT3NZXF.js";
import "./chunk-EGGHZP6O.js";
import {
  CommonModule,
  Component,
  HttpClient,
  Injectable,
  MatButton,
  MatButtonModule,
  MatIcon,
  MatIconModule,
  catchError,
  inject,
  setClassMetadata,
  tap,
  throwError,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext
} from "./chunk-IXVPDR65.js";
import "./chunk-UGR6JUJC.js";

// src/app/modules/hojadevida/pages/eliminar-datos/services/eliminar-datos.service.ts
var EliminarDatosService = class _EliminarDatosService {
  http = inject(HttpClient);
  notify = inject(NotificationService);
  base = environment.hojaDeVidaApiUrl + "/persona";
  eliminarPersonaCompleta() {
    return this.http.delete(`${this.base}/eliminar-persona-completa`).pipe(tap(() => this.notify.showSuccess("Hoja de vida eliminada correctamente.")), catchError((err) => {
      this.handleError(err, "No fue posible eliminar los datos");
      return throwError(() => err);
    }));
  }
  handleError(error, msg) {
    console.error(error);
    this.notify.showError(msg);
    return throwError(() => error);
  }
  static \u0275fac = function EliminarDatosService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EliminarDatosService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _EliminarDatosService, factory: _EliminarDatosService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EliminarDatosService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

// src/app/modules/hojadevida/pages/eliminar-datos/eliminar-datos.component.ts
var EliminarDatosComponent = class _EliminarDatosComponent {
  confirm = inject(ConfirmDialogService);
  eliminarService = inject(EliminarDatosService);
  auth = inject(AuthService);
  store = inject(Store);
  idPersona = this.store.selectSignal(selectIdPersona);
  onClickDeleteAll() {
    this.confirm.open({
      type: "delete",
      title: "Eliminar todos mis datos",
      message: "Esta acci\xF3n <strong>eliminar\xE1 permanentemente toda</strong> la informaci\xF3n asociada a tu cuenta. \xBFDeseas continuar?"
    }).subscribe((ok) => {
      if (!ok)
        return;
      this.eliminarService.eliminarPersonaCompleta().subscribe(() => this.auth.signOut());
    });
  }
  static \u0275fac = function EliminarDatosComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _EliminarDatosComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EliminarDatosComponent, selectors: [["app-eliminar-datos"]], decls: 12, vars: 0, consts: [[1, "delete-card"], ["align", "end", 1, "actions"], ["mat-flat-button", "", "color", "error", 1, "btn-delete", 3, "click"]], template: function EliminarDatosComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-card", 0)(1, "mat-card-header")(2, "mat-card-title")(3, "mat-icon");
      \u0275\u0275text(4, "database");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5, " Borrar mis datos ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "mat-card-content")(7, "p");
      \u0275\u0275text(8, " Si deseas borrar todos los datos de tu cuenta, puedes hacerlo presionando el bot\xF3n. Esta acci\xF3n es irreversible y eliminar\xE1 tu cuenta. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "mat-card-actions", 1)(10, "button", 2);
      \u0275\u0275listener("click", function EliminarDatosComponent_Template_button_click_10_listener() {
        return ctx.onClickDeleteAll();
      });
      \u0275\u0275text(11, " Borrar todos mis datos ");
      \u0275\u0275elementEnd()()();
    }
  }, dependencies: [CommonModule, MatCardModule, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatButtonModule, MatButton, MatIconModule, MatIcon], styles: ["\n\n.delete-card[_ngcontent-%COMP%] {\n  margin: 24px auto;\n  max-width: 880px;\n  border: 1px solid var(--outline-variant);\n  box-shadow: none;\n}\n.actions[_ngcontent-%COMP%] {\n  padding: 16px 24px 24px;\n  display: flex;\n  justify-content: flex-end;\n}\n.btn-delete[_ngcontent-%COMP%] {\n  text-transform: none;\n  font-weight: 600;\n}\n/*# sourceMappingURL=eliminar-datos.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EliminarDatosComponent, [{
    type: Component,
    args: [{ selector: "app-eliminar-datos", imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule], template: '<mat-card class="delete-card">\n  <mat-card-header>\n    <mat-card-title>\n      <mat-icon>database</mat-icon>\n      Borrar mis datos\n    </mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n    <p>\n      Si deseas borrar todos los datos de tu cuenta, puedes hacerlo presionando\n      el bot\xF3n. Esta acci\xF3n es irreversible y eliminar\xE1 tu cuenta.\n    </p>\n  </mat-card-content>\n  <mat-card-actions align="end" class="actions">\n    <button\n      mat-flat-button\n      color="error"\n      class="btn-delete"\n      (click)="onClickDeleteAll()"\n    >\n      Borrar todos mis datos\n    </button>\n  </mat-card-actions>\n</mat-card>\n', styles: ["/* src/app/modules/hojadevida/pages/eliminar-datos/eliminar-datos.component.scss */\n.delete-card {\n  margin: 24px auto;\n  max-width: 880px;\n  border: 1px solid var(--outline-variant);\n  box-shadow: none;\n}\n.actions {\n  padding: 16px 24px 24px;\n  display: flex;\n  justify-content: flex-end;\n}\n.btn-delete {\n  text-transform: none;\n  font-weight: 600;\n}\n/*# sourceMappingURL=eliminar-datos.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EliminarDatosComponent, { className: "EliminarDatosComponent", filePath: "src/app/modules/hojadevida/pages/eliminar-datos/eliminar-datos.component.ts", lineNumber: 18 });
})();
export {
  EliminarDatosComponent
};
//# sourceMappingURL=chunk-CERP4WZU.js.map
