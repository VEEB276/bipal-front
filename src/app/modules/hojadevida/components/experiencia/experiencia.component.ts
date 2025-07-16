import { Component, OnInit } from '@angular/core';
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
import { Experiencia, TipoExperienciaOption, TrabajoActualOption } from './interfaces/experiencia.interface';

@Component({
  selector: 'app-experiencia',
  standalone: true,
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
    MatNativeDateModule
  ],
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.scss']
})
export class ExperienciaComponent implements OnInit {
  experienciaForm: FormGroup;

  tiposExperiencia: TipoExperienciaOption[] = [
    { value: 'laboral', label: 'Laboral' },
    { value: 'profesional', label: 'Profesional' },
    { value: 'academica', label: 'Académica' },
    { value: 'investigacion', label: 'Investigación' }
  ];

  trabajoActualOptions: TrabajoActualOption[] = [
    { value: 'si', label: 'Sí' },
    { value: 'no', label: 'No' }
  ];

  constructor(private fb: FormBuilder) {
    this.experienciaForm = this.fb.group({
      experiencias: this.fb.array([])
    });
  }

  ngOnInit(): void {}

  get experienciasArray(): FormArray {
    return this.experienciaForm.get('experiencias') as FormArray;
  }

  createExperienciaFormGroup(): FormGroup {
    return this.fb.group({
      perfilProfesional: ['', [Validators.required, Validators.maxLength(800)]],
      tipoExperiencia: ['', Validators.required],
      nombreEmpresa: ['', [Validators.required, Validators.maxLength(255)]],
      nombreCargo: ['', [Validators.required, Validators.maxLength(255)]],
      dependencia: ['', [Validators.required, Validators.maxLength(255)]],
      esTrabajoActual: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaRetiro: ['']
    });
  }

  agregarExperiencia(): void {
    this.experienciasArray.push(this.createExperienciaFormGroup());
  }

  eliminarExperiencia(index: number): void {
    this.experienciasArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.experienciaForm.valid) {
      console.log('Experiencia:', this.experienciaForm.value);
      // Aquí puedes agregar la lógica para enviar los datos
    } else {
      console.log('Formulario inválido');
      this.markFormGroupTouched(this.experienciaForm);
    }
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
  isRetiroDisabled(index: number): boolean {
    const esTrabajoActual = this.getExperienciaControl(index, 'esTrabajoActual')?.value;
    return esTrabajoActual === 'si';
  }

  // Al cambiar trabajo actual, reiniciar fecha de retiro si es trabajo actual
  onTrabajoActualChange(index: number): void {
    const esTrabajoActual = this.getExperienciaControl(index, 'esTrabajoActual')?.value;
    if (esTrabajoActual === 'si') {
      this.getExperienciaControl(index, 'fechaRetiro')?.setValue('');
    }
  }
}
