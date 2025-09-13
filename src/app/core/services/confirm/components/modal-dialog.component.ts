import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogConfig } from '../confirm-dialog.types';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-modal-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent {
  config: ConfirmDialogConfig;
  primaryBtnClass: string;

  constructor(
    private readonly dialogRef: MatDialogRef<ModalDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) data: ConfirmDialogConfig
  ) {
    this.config = this.applyDefaults(data);
    this.primaryBtnClass = this.resolvePrimaryClass(this.config);
  }

  private applyDefaults(cfg: ConfirmDialogConfig): ConfirmDialogConfig {
    const base: Partial<ConfirmDialogConfig> = { disableClose: false, autoFocus: 'primary' };
    const typeDefaults: Record<string, Partial<ConfirmDialogConfig>> = {
      confirm: { primaryText: 'Aceptar', secondaryText: 'Cancelar' },
      delete: { primaryText: 'Eliminar', secondaryText: 'Cancelar' },
      warning: { primaryText: 'Aceptar', secondaryText: 'Cancelar' },
      info: { primaryText: 'Aceptar' }
    };
    return { ...base, ...typeDefaults[cfg.type], ...cfg } as ConfirmDialogConfig;
  }

  private resolvePrimaryClass(cfg: ConfirmDialogConfig): string {
    if (cfg.primaryColorClass) return cfg.primaryColorClass;
    switch (cfg.type) {
      case 'delete': return 'primary-warn';
      case 'warning': return 'primary-warning';
      case 'info': return 'primary-info';
      default: return 'primary-primary';
    }
  }

  close(result: boolean) {
    this.dialogRef.close(result);
  }




  
}
