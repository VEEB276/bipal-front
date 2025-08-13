import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSliderModule } from "@angular/material/slider";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import {
  EstudioHvCreateDto,
  NivelEducativoDto,
} from "./interfaces/perfil-academico.interface";
import { EstudiosHvService } from "./services";
import { AuthService } from "../../../../core/auth/auth.service";
import { Store } from "@ngrx/store";
import { selectPersona } from "../../store";

@Component({
  selector: "app-perfil-academico",
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
    MatDividerModule,
  ],
  templateUrl: "./perfil-academico.component.html",
  styleUrls: ["./perfil-academico.component.scss"],
})
export class PerfilAcademicoComponent implements OnInit {
  perfilForm: FormGroup;
  nivelesEducativos: NivelEducativoDto[] = [];

  idHojaVida: number | undefined;

  // Opciones de graduado boolean -> UI
  graduadoOptions = [
    { value: true, label: "Sí" },
    { value: false, label: "No" },
  ];

  private readonly estudiosService = inject(EstudiosHvService);
  private readonly auth = inject(AuthService);
  private readonly store = inject(Store);

  constructor(private readonly fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      estudios: this.fb.array([this.createEstudioFormGroup()]),
    });
  }

  ngOnInit(): void {
    this.idHojaVida = this.store.selectSignal(selectPersona)().idHojaVida;
    this.cargarNivelesEducativos();
    this.estudiosService
      .obtenerEstudiosPorPersona(this.idHojaVida)
      .subscribe((estudios) => {
        //console.log(estudios);
        this.cargarEstudios(estudios);
      });
  }

  get estudiosArray(): FormArray {
    return this.perfilForm.get("estudios") as FormArray;
  }

  createEstudioFormGroup(): FormGroup {
    return this.fb.group({
      nombreTitulo: ["", [Validators.required, Validators.maxLength(255)]],
      graduado: [false, Validators.required],
      idNivelEducativo: [null, Validators.required],
      nombreInstitucion: ["", [Validators.required, Validators.maxLength(255)]],
      semestresAprobados: [
        0,
        [Validators.required, Validators.min(0), Validators.max(16)],
      ],
    });
  }

  cargarEstudios(estudios: any[]) {
    this.estudiosArray.clear(); // Limpiar el array antes de cargar nuevos estudios
    estudios.forEach((estudio) => {
      this.estudiosArray.push(
        this.fb.group({
          nombreTitulo: [
            estudio.nombreTitulo,
            [Validators.required, Validators.maxLength(255)],
          ],
          graduado: [estudio.graduado, Validators.required],
          idNivelEducativo: [estudio.idNivelEducativo, Validators.required],
          nombreInstitucion: [
            estudio.nombreInstitucion,
            [Validators.required, Validators.maxLength(255)],
          ],
          semestresAprobados: [
            estudio.semestresAprobados,
            [Validators.required, Validators.min(0), Validators.max(16)],
          ],
        })
      );
    });
  }

  agregarEstudio(): void {
    this.estudiosArray.push(this.createEstudioFormGroup());
  }

  eliminarEstudio(index: number): void {
    if (this.estudiosArray.length > 1) {
      this.estudiosArray.removeAt(index);
    }
  }

  private cargarNivelesEducativos(): void {
    this.estudiosService.obtenerNivelesEducativos().subscribe({
      next: (niveles) => (this.nivelesEducativos = niveles || []),
      error: (err) => console.error("Error cargando niveles educativos", err),
    });
  }

  onSubmit(): void {
    if (!this.perfilForm.valid) {
      this.markFormGroupTouched(this.perfilForm);
      return;
    }
    const payload: EstudioHvCreateDto[] = this.estudiosArray.controls.map(
      (ctrl) => ({
        idHojaVida: this.idHojaVida,
        nombreTitulo: ctrl.get("nombreTitulo")?.value,
        graduado: ctrl.get("graduado")?.value,
        idNivelEducativo: ctrl.get("idNivelEducativo")?.value,
        nombreInstitucion: ctrl.get("nombreInstitucion")?.value,
        semestresAprobados: ctrl.get("semestresAprobados")?.value,
      })
    );
    console.log("Payload Estudios HV", payload);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // TODO: lógica update vs create (si backend soporta actualizar lote) – por ahora siempre create
    this.estudiosService.crearEstudios(payload).subscribe({
      next: (resp) => console.log("Estudios guardados", resp),
      error: (err) => console.error("Error guardando estudios", err),
    });
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((arrayControl) => {
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
