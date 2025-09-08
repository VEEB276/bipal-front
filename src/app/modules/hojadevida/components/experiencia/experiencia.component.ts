import { Component, OnInit, Signal, inject, signal, ChangeDetectorRef } from '@angular/core';
import moment from 'moment';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ExperienciaHvDto, TipoExperienciaOption } from './interfaces/experiencia.interface';
import { ExperienciaService } from './services/experiencia.service';
import { Store } from '@ngrx/store';
import { selectIdHojaVida, selectIdPersona } from '../../store';
import { SkeletonBannerComponent } from '../../../../core/components';
import { ScrollFirstInvalidDirective } from '../../../../core/directives';
import { ConfirmDialogService } from '../../../../core/services';

@Component({
  selector: 'app-experiencia',
  // standalone implícito en Angular 19+
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SkeletonBannerComponent,
    ScrollFirstInvalidDirective
  ],
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss']
})
export class ExperienciaComponent implements OnInit {
  experienciaForm: FormGroup;
  loading = signal(true);
  tiposExperienciaSignal = signal<TipoExperienciaOption[]>([]);
  idHojaVida: Signal<number>;
  idPersona: Signal<number>;
  trabajoActualOptions = [
    { value: 'si', label: 'Sí' },
    { value: 'no', label: 'No' }
  ];

  private readonly service = inject(ExperienciaService);
  private readonly store = inject(Store);
  private readonly confirm = inject(ConfirmDialogService);
  private readonly cdr = inject(ChangeDetectorRef);

  constructor(private readonly fb: FormBuilder) {
    this.experienciaForm = this.fb.group({
      experiencias: this.fb.array([])
    });
    this.idHojaVida = this.store.selectSignal(selectIdHojaVida);
    this.idPersona = this.store.selectSignal(selectIdPersona);
  }

  ngOnInit(): void {
    const idPersona = this.idPersona();
    // Cargar tipos y experiencias en paralelo
    this.service.buscarTiposExperiencia().subscribe((tipos) => {
      this.tiposExperienciaSignal.set(tipos.map(t => ({ value: t.id, label: t.nombre })));
      if (idPersona) {
        this.service.obtenerExperienciasPorPersona(idPersona).subscribe((lista) => {
          if (lista?.length) {
            this.patchForm(lista);
          }
          this.loading.set(false);
        });
      } else {
        this.agregarExperiencia();
        this.loading.set(false);
      }
    });
  }

  get experienciasArray(): FormArray { return this.experienciaForm.get('experiencias') as FormArray; }

  createExperienciaFormGroup(data?: Partial<ExperienciaHvDto>): FormGroup {
    const fechaDesdeParsed = data?.fechaDesde ? this.toDate(data.fechaDesde) : null;
    const fechaHastaParsed = data?.fechaHasta ? this.toDate(data.fechaHasta) : null;
    return this.fb.group({
      id: [data?.id ?? null],
      idHojaVida: [data?.idHojaVida ?? this.idHojaVida()],
      idTipoExperiencia: [data?.idTipoExperiencia ?? null, Validators.required],
      descripcionPerfil: [data?.descripcionPerfil ?? '', [Validators.required, Validators.maxLength(800)]],
      nombreEmpresa: [data?.nombreEmpresa ?? '', [Validators.required, Validators.maxLength(255)]],
      nombreCargo: [data?.nombreCargo ?? '', [Validators.required, Validators.maxLength(255)]],
      dependenciaCargo: [data?.dependenciaCargo ?? '', [Validators.required, Validators.maxLength(255)]],
      fechaDesde: [fechaDesdeParsed, Validators.required],
      fechaHasta: [fechaHastaParsed],
      esTrabajoActual: [data?.fechaHasta ? 'no' : 'si', Validators.required]
    });
  }

  private patchForm(lista: ExperienciaHvDto[]) {
    const arr = this.experienciasArray; arr.clear();
    lista.forEach(item => arr.push(this.createExperienciaFormGroup(item)));
  }

  agregarExperiencia(): void { this.experienciasArray.push(this.createExperienciaFormGroup()); }

  eliminarExperiencia(index: number): void {
    const group = this.experienciasArray.at(index) as FormGroup | null;
    const empresa = (group?.get('nombreEmpresa')?.value || '').trim();
    const cargo = (group?.get('nombreCargo')?.value || '').trim();
    const label = (cargo || empresa) ? `"${cargo || empresa}"` : 'seleccionado';
    this.confirm.open({
      title: 'Confirmar eliminación',
      message: `¿Deseas eliminar el registro de experiencia ${label}?`,
      type: 'delete'
    }).subscribe(ok => {
      if (!ok) return;
      const id = group?.get('id')?.value;
      if (id) {
        this.service.eliminarExperiencia(id).subscribe(() => {
          this.experienciasArray.removeAt(index);
          this.cdr.detectChanges();
        });
      } else {
        this.experienciasArray.removeAt(index);
        this.cdr.detectChanges();
      }
    });
  }

  onSubmit(): void {
    if (!this.experienciaForm.valid) {
      this.markFormGroupTouched(this.experienciaForm);
      return;
    }
    const raw = this.experienciaForm.value.experiencias as any[]; // incluye campo auxiliar esTrabajoActual
    const idHv = this.idHojaVida();
    const payload: ExperienciaHvDto[] = raw.map(e => {
      const fechaDesde = e.fechaDesde ? this.toDate(e.fechaDesde) : null;
      let fechaHasta = null;
      if (e.esTrabajoActual !== 'si') {
        fechaHasta = e.fechaHasta ? this.toDate(e.fechaHasta) : null;
      }
      return {
        id: e.id ?? null,
        idHojaVida: e.idHojaVida ?? idHv,
        idTipoExperiencia: e.idTipoExperiencia,
        descripcionPerfil: e.descripcionPerfil,
        nombreEmpresa: e.nombreEmpresa,
        nombreCargo: e.nombreCargo,
        dependenciaCargo: e.dependenciaCargo,
        fechaDesde,
        fechaHasta
      };
    });
    this.service.guardarExperiencias(payload).subscribe(listaActualizada => {
      // Reemplazar ids devueltos
      this.experienciasArray.controls.forEach((control, idx) => control.patchValue(listaActualizada[idx]));
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl);
          } else {
            arrayControl.markAsTouched();
          }
        });
      } else {
        control?.markAsTouched();
      }
    });
  }

  // Métodos auxiliares para obtener controles específicos
  getExperienciaControl(index: number, field: string) {
    return this.experienciasArray.at(index).get(field);
  }

  // Verificar si debe deshabilitar la fecha de retiro
  isRetiroDisabled(index: number): boolean { return this.getExperienciaControl(index, 'esTrabajoActual')?.value === 'si'; }

  // Al cambiar trabajo actual, reiniciar fecha de retiro si es trabajo actual
  onTrabajoActualChange(index: number): void {
    if (this.isRetiroDisabled(index)) {
      this.getExperienciaControl(index, 'fechaHasta')?.setValue(null);
    }
  }

  private toDate(value: string | Date): Date | null {
    if (!value) return null;
    if (value instanceof Date) return value;
    // Intentar formato backend 'YYYY-MM-DD'
    const m = moment(value, ['YYYY-MM-DD', moment.ISO_8601], true);
    return m.isValid() ? m.toDate() : null;
  }

  trackExperiencia = (control: any, index: number) => control?.value?.id ?? index;
}
