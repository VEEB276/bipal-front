import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../../environments/environment";
import { NotificationService } from "../../../../../core/services";
import { catchError, tap, throwError } from "rxjs";

@Injectable({ providedIn: "root" })
export class EliminarDatosService {
  private readonly http = inject(HttpClient);
  private readonly notify = inject(NotificationService);
  private readonly base = environment.hojaDeVidaApiUrl + "/persona";

  eliminarPersonaCompleta() {
    return this.http
      .delete<void>(`${this.base}/eliminar-persona-completa`)
      .pipe(
        tap(() =>
          this.notify.showSuccess("Hoja de vida eliminada correctamente.")
        ),
        catchError((err) => {
          this.handleError(err, "No fue posible eliminar los datos");
          return throwError(() => err);
        })
      );
  }

  private handleError(error: any, msg: string) {
    console.error(error);
    this.notify.showError(msg);
    return throwError(() => error);
  }
}
