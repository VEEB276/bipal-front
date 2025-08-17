import { TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';

export type ConfirmDialogType = 'confirm' | 'delete' | 'warning' | 'info';

export interface ConfirmDialogConfig {
  type: ConfirmDialogType;
  title: string;
  message?: string;
  templateRef?: TemplateRef<any>;
  component?: ComponentType<any>;
  componentInputs?: Record<string, unknown>;
  disableClose?: boolean;
  widthClass?: string; // clase css opcional para controlar ancho; si no se pasa se usa min-width 560px
  primaryText?: string;
  secondaryText?: string;
  primaryColorClass?: string; // override de color botón primario
  autoFocus?: 'primary' | 'secondary' | 'none';
  data?: any;
}

export interface ConfirmDialogResult {
  confirmed: boolean;
}
