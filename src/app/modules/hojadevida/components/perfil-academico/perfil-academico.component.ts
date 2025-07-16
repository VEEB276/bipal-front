import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { PerfilAcademico, NivelEducativo, GraduadoOption } from './interfaces/perfil-academico.interface';

@Component({
  selector: 'app-perfil-academico',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './perfil-academico.component.html',
  styleUrls: ['./perfil-academico.component.scss']
})
export class PerfilAcademicoComponent implements OnInit {
  perfilForm: FormGroup;

  nivelesEducativos: NivelEducativo[] = [
    { value: 'tecnico', label: 'Técnico' },
    { value: 'tecnologo', label: 'Tecnólogo' },
    { value: 'profesional', label: 'Profesional' },
    { value: 'especializacion', label: 'Especialización' },
    { value: 'maestria', label: 'Maestría' },
    { value: 'doctorado', label: 'Doctorado' },
    { value: 'bachiller', label: 'Bachiller' }
  ];

  graduadoOptions: GraduadoOption[] = [
    { value: 'si', label: 'Sí' },
    { value: 'no', label: 'No' }
  ];

  constructor(private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      titulos: this.fb.array([this.createTituloFormGroup()])
    });
  }

  ngOnInit(): void {}

  get titulosArray(): FormArray {
    return this.perfilForm.get('titulos') as FormArray;
  }

  createTituloFormGroup(): FormGroup {
    return this.fb.group({
      tituloAcademico: ['', [Validators.required, Validators.maxLength(255)]],
      graduado: ['', Validators.required],
      nivelEducativo: ['', Validators.required],
      institucionEducativa: ['', [Validators.required, Validators.maxLength(255)]],
      semestresAprobados: [0, [Validators.required, Validators.min(0), Validators.max(16)]]
    });
  }

  agregarTitulo(): void {
    this.titulosArray.push(this.createTituloFormGroup());
  }

  eliminarTitulo(index: number): void {
    if (this.titulosArray.length > 1) {
      this.titulosArray.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      console.log('Perfil Académico:', this.perfilForm.value);
      // Aquí puedes agregar la lógica para enviar los datos
    } else {
      console.log('Formulario inválido');
      this.markFormGroupTouched(this.perfilForm);
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
  getTituloControl(index: number, field: string) {
    return this.titulosArray.at(index).get(field);
  }
}
