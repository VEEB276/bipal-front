import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModalDialogComponent } from './components/modal-dialog.component';
import { ConfirmDialogConfig } from './confirm-dialog.types';

@Injectable({providedIn: 'root'})
export class ConfirmDialogService {
  private readonly dialog = inject(MatDialog);

  open(config: ConfirmDialogConfig): Observable<boolean> {
    const dialogConfig: MatDialogConfig<ConfirmDialogConfig> = {
      data: config,
      disableClose: !!config.disableClose,
      panelClass: ['confirm-dialog-panel']
    };
  const ref = this.dialog.open(ModalDialogComponent, dialogConfig);
    return ref.afterClosed().pipe(map(result => !!result));
  }
}
