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
import { OtroEstudio, GraduadoOption } from './interfaces/otros-estudios.interface';

@Component({
  selector: 'app-otros-estudios',
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
    MatDividerModule
  ],
  templateUrl: './otros-estudios.component.html',
  styleUrls: ['./otros-estudios.component.scss']
})
export class OtrosEstudiosComponent implements OnInit {
  estudiosForm: FormGroup;

  graduadoOptions: GraduadoOption[] = [
    { value: 'si', label: 'Sí' },
    { value: 'no', label: 'No' }
  ];

  constructor(private fb: FormBuilder) {
    this.estudiosForm = this.fb.group({
      estudios: this.fb.array([])
    });
  }

  ngOnInit(): void {}

  get estudiosArray(): FormArray {
    return this.estudiosForm.get('estudios') as FormArray;
  }

  createEstudioFormGroup(): FormGroup {
    return this.fb.group({
      nombreCurso: ['', [Validators.required, Validators.maxLength(255)]],
      graduado: ['', Validators.required],
      numeroHoras: [1, [Validators.required, Validators.min(1), Validators.max(9999)]],
      institucionEducativa: ['', [Validators.required, Validators.maxLength(255)]]
    });
  }

  agregarEstudio(): void {
    this.estudiosArray.push(this.createEstudioFormGroup());
  }

  eliminarEstudio(index: number): void {
    this.estudiosArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.estudiosForm.valid) {
      console.log('Otros Estudios:', this.estudiosForm.value);
      // Aquí puedes agregar la lógica para enviar los datos
    } else {
      console.log('Formulario inválido');
      this.markFormGroupTouched(this.estudiosForm);
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
  getEstudioControl(index: number, field: string) {
    return this.estudiosArray.at(index).get(field);
  }
}
