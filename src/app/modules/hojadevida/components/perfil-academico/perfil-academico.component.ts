import {
  Component,
  OnInit,
  Signal,
  inject,
  ChangeDetectorRef,
  signal,
} from "@angular/core";
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
import { selectIdHojaVida, selectIdPersona } from "../../store";
import { forkJoin, tap } from "rxjs";
import { ConfirmDialogService } from "../../../../core/services";
import { SkeletonBannerComponent } from "../../../../core/components";

@Component({
  selector: "app-perfil-academico",
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
    SkeletonBannerComponent,
  ],
  templateUrl: "./perfil-academico.component.html",
  styleUrls: ["./perfil-academico.component.scss"],
})
export class PerfilAcademicoComponent implements OnInit {
  perfilForm: FormGroup;
  nivelesEducativos: NivelEducativoDto[] = [];

  idHojaVida: Signal<number>;
  idPersona: Signal<number>;

  // Opciones de graduado boolean -> UI
  graduadoOptions = [
    { value: true, label: "Sí" },
    { value: false, label: "No" },
  ];

  //inject dependencies
  private readonly estudiosService = inject(EstudiosHvService);
  private readonly auth = inject(AuthService);
  private readonly store = inject(Store);
  private readonly confirm = inject(ConfirmDialogService);
  private readonly cdr = inject(ChangeDetectorRef);

  constructor(private readonly fb: FormBuilder) {
    this.idPersona = this.store.selectSignal(selectIdPersona);
    this.idHojaVida = this.store.selectSignal(selectIdHojaVida);
    this.perfilForm = this.fb.group({
      estudios: this.fb.array([this.createEstudioFormGroup()]),
    });
    console.log("hv", this.idHojaVida);
  }

  loading = signal(true);

  ngOnInit(): void {
    // Indicamos cargando mientras se obtienen niveles y estudios
    forkJoin({
      niveles: this.cargarNivelesEducativos(),
      estudios: this.estudiosService.obtenerEstudiosPorPersona(
        this.idPersona()
      ),
    }).subscribe(({ estudios }) => {
      this.patchFormEstudios(estudios);
      this.loading.set(false);
    });
  }

  get estudiosArray(): FormArray {
    return this.perfilForm.get("estudios") as FormArray;
  }

  createEstudioFormGroup(): FormGroup {
    return this.fb.group({
      id: [null],
      idHojaVida: [this.idHojaVida()],
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

  patchFormEstudios(estudios: any[]) {
    this.estudiosArray.clear(); // Limpiar el array antes de cargar nuevos estudios
    estudios.forEach((estudio) => {
      this.estudiosArray.push(
        this.fb.group({
          id: [estudio.id],
          idHojaVida: [this.idHojaVida()],
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
    // Si la UI evita eliminar el único registro, hacemos early return defensivo
    if (this.estudiosArray.length <= 1) return;

    const grupo = this.estudiosArray.at(index) as FormGroup;
    const id = grupo?.get("id")?.value;

    this.confirm
      .open({
        title: "Confirmar eliminación",
        message: `¿Estás seguro de que deseas eliminar el estudio <strong>${grupo?.get("nombreTitulo")?.value}</strong>?`,
        type: "delete",
      })
      .subscribe((action) => {
        //si se cancelo la accion de eliminar
        if (!action) return;
        const removeLocal = () => {
          this.estudiosArray.removeAt(index);
          // Forzar CD si algún control queda con estado sucio que no dispara automáticamente
          this.cdr.markForCheck();
        };
        if (id) {
          this.estudiosService
            .eliminarEstudio(id)
            .subscribe(() => removeLocal());
        } else {
          removeLocal();
        }
      });
  }

  trackEstudio(group: any, index: number) {
    return group?.get("id")?.value ?? index;
  }

  private cargarNivelesEducativos() {
    return this.estudiosService
      .obtenerNivelesEducativos()
      .pipe(tap((niveles) => (this.nivelesEducativos = niveles || [])));
  }

  onSubmit(): void {
    if (!this.perfilForm.valid) {
      this.markFormGroupTouched(this.perfilForm);
      return;
    }
    const payload: EstudioHvCreateDto[] = this.estudiosArray.controls.map(
      (ctrl) => ctrl.value
    );
    console.log("Payload Estudios HV", payload);
    // pendiente: cuando backend exponga actualización por lote, aquí decidir create vs update
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
