import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PersonaDto } from '../../models';

@Component({
  selector: 'app-info-personal',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './info-personal.component.html',
  styleUrl: './info-personal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoPersonalComponent implements OnInit {
  
  personaForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.personaForm = this.fb.group({
      // Información personal básica
      primerNombre: ['', [Validators.required, Validators.maxLength(255)]],
      segundoNombre: ['', [Validators.maxLength(255)]],
      primerApellido: ['', [Validators.required, Validators.maxLength(255)]],
      segundoApellido: ['', [Validators.maxLength(255)]],
      
      // Documento
      idTipoDocumento: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required, Validators.maxLength(128)]],
      fechaExpedicionDocumento: ['', [Validators.required]],
      
      // Información personal
      fechaNacimiento: ['', [Validators.required]],
      lugarNacimiento: ['', [Validators.required, Validators.maxLength(255)]],
      departamentoResidencia: ['', [Validators.required, Validators.maxLength(255)]],
      ciudadResidencia: ['', [Validators.required, Validators.maxLength(255)]],
      direccionResidencia: ['', [Validators.required, Validators.maxLength(255)]],
      
      // Contacto
      numeroTelefono: ['', [Validators.required, Validators.maxLength(63), Validators.pattern(/^\d{10}$/)]],
      correoElectronico: ['', [Validators.required, Validators.email, Validators.maxLength(127)]],
      
      // Información adicional
      idGenero: ['', [Validators.required]],
      idEnfoqueDiferencial: ['', [Validators.required]],
      
      // informacion de Contacto adicional 
      nombreContacto: ['', [Validators.required, Validators.maxLength(255)]],
      numeroTelefonoContacto: ['', [Validators.required, Validators.maxLength(63), Validators.pattern(/^\d{10}$/)]],
      correoElectronicoContacto: ['', [Validators.required, Validators.email, Validators.maxLength(127)]]
    });
  }

  onSubmit(): void {
    if (this.personaForm.valid) {
      const formData: PersonaDto = this.personaForm.value;
      console.log('Form Data:', formData);
      // Aquí iría la lógica para enviar los datos
    } else {
      console.log('Form is invalid');
      this.personaForm.markAllAsTouched();
    }
  }
  // Getters para facilitar el acceso a los controles en el template
  get primerNombre() { return this.personaForm.get('primerNombre'); }
  get segundoNombre() { return this.personaForm.get('segundoNombre'); }
  get primerApellido() { return this.personaForm.get('primerApellido'); }
  get segundoApellido() { return this.personaForm.get('segundoApellido'); }
  get idTipoDocumento() { return this.personaForm.get('idTipoDocumento'); }
  get numeroDocumento() { return this.personaForm.get('numeroDocumento'); }
  get fechaExpedicionDocumento() { return this.personaForm.get('fechaExpedicionDocumento'); }
  get fechaNacimiento() { return this.personaForm.get('fechaNacimiento'); }
  get lugarNacimiento() { return this.personaForm.get('lugarNacimiento'); }
  get departamentoResidencia() { return this.personaForm.get('departamentoResidencia'); }
  get ciudadResidencia() { return this.personaForm.get('ciudadResidencia'); }
  get direccionResidencia() { return this.personaForm.get('direccionResidencia'); }
  get numeroTelefono() { return this.personaForm.get('numeroTelefono'); }
  get correoElectronico() { return this.personaForm.get('correoElectronico'); }
  get idGenero() { return this.personaForm.get('idGenero'); }
  get idEnfoqueDiferencial() { return this.personaForm.get('idEnfoqueDiferencial'); }
  get nombreContacto() { return this.personaForm.get('nombreContacto'); }
  get numeroTelefonoContacto() { return this.personaForm.get('numeroTelefonoContacto'); }
  get correoElectronicoContacto() { return this.personaForm.get('correoElectronicoContacto'); }
}
