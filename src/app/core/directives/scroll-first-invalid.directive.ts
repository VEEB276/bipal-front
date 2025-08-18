import { Directive, ElementRef, Input, HostListener, inject } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[scrollFirstInvalid]',
  standalone: true
})
export class ScrollFirstInvalidDirective {
  private readonly formGroupDir = inject(FormGroupDirective, { optional: true });
  private readonly hostEl = inject(ElementRef<HTMLElement>);

  /** Distancia en px para dejar margen superior tras el scroll */
  @Input() sfiOffset = 0;
  /** Contenedor scroll custom: puede ser selector string o elemento */
  @Input() sfiContainer?: string | HTMLElement;
  /** Si enfocar automáticamente */
  @Input() sfiFocus = true;

  @HostListener('submit', ['$event'])
  onHostSubmit(event: Event) {
    const form = this.formGroupDir?.control;
    if (!form) return; // No reactive form context
    if (form.valid) return; // Nada que hacer si es válido
    // NO marcamos touched (requisito usuario) — el componente decide.
    this.scrollToFirstInvalid();
  }

  private resolveContainer(): HTMLElement | Window {
    if (!this.sfiContainer) return window;
    if (typeof this.sfiContainer === 'string') {
      return (document.querySelector(this.sfiContainer) as HTMLElement) || window;
    }
    return this.sfiContainer;
  }

  private scrollToFirstInvalid(): void {
    const root = this.hostEl.nativeElement;
    const selector = [
      'mat-form-field.ng-invalid',
      '[formcontrolname].ng-invalid',
      'input.ng-invalid',
      'textarea.ng-invalid',
      'select.ng-invalid'
    ].join(',');
  const first = root.querySelector(selector) as HTMLElement | null;
    if (!first) return;

    const field = (first.closest('mat-form-field') as HTMLElement) || first;
    const container = this.resolveContainer();
    const rect = field.getBoundingClientRect();

    if (container === window) {
      const top = window.scrollY + rect.top - this.sfiOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      const cRect = (container as HTMLElement).getBoundingClientRect();
      const currentScroll = (container as HTMLElement).scrollTop;
      const top = currentScroll + (rect.top - cRect.top) - this.sfiOffset;
      (container as HTMLElement).scrollTo({ top, behavior: 'smooth' });
    }

    if (this.sfiFocus) {
  const focusable = field.querySelector('input, textarea, select, [tabindex], mat-select') as HTMLElement | null;
      if (focusable) setTimeout(() => focusable.focus(), 150);
    }
  }
}
