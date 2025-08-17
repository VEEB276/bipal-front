import { Component, OnInit, Signal, inject, signal, ChangeDetectorRef } from "@angular/core";
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
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import {
  OtroEstudioHvDto,
  GraduadoOption,
} from "./interfaces/otros-estudios.interface";
import { OtrosEstudiosService } from "./services/otros-estudios.service";
import { Store } from "@ngrx/store";
import { selectIdHojaVida, selectIdPersona } from "../../store";
import { SkeletonBannerComponent } from "../../../../core/components";
import { ConfirmDialogService } from "../../../../core/services";

@Component({
  selector: "app-otros-estudios",
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
    SkeletonBannerComponent,
  ],
  templateUrl: "./otros-estudios.component.html",
  styleUrls: ["./otros-estudios.component.scss"],
})
export class OtrosEstudiosComponent implements OnInit {
  estudiosForm: FormGroup;
  loading = signal(true);
  idHojaVida: Signal<number>;
  idPersona: Signal<number>;

  graduadoOptions: GraduadoOption[] = [
    { value: true, label: "Sí" },
    { value: false, label: "No" },
  ];

  private readonly otrosService = inject(OtrosEstudiosService);
  private readonly store = inject(Store);
  private readonly confirm = inject(ConfirmDialogService);
  private readonly cdr = inject(ChangeDetectorRef);

  constructor(private readonly fb: FormBuilder) {
    this.estudiosForm = this.fb.group({
      estudios: this.fb.array([]),
    });
    this.idHojaVida = this.store.selectSignal(selectIdHojaVida);
    this.idPersona = this.store.selectSignal(selectIdPersona);
  }

  ngOnInit(): void {
    // Cargar existentes si los hay
    const personaId = this.idPersona();
    if (personaId) {
      this.otrosService.obtenerOtrosEstudiosPorPersona(personaId).subscribe({
        next: (lista) => {
          if (lista?.length) {
            this.patchForm(lista);
          }
          this.loading.set(false);
        },
        error: () => {
          this.agregarEstudio();
          this.loading.set(false);
        },
      });
    } else {
      this.agregarEstudio();
      this.loading.set(false);
    }
  }

  get estudiosArray(): FormArray {
    return this.estudiosForm.get("estudios") as FormArray;
  }

  createEstudioFormGroup(data?: Partial<OtroEstudioHvDto>): FormGroup {
    return this.fb.group({
      id: [data?.id ?? null],
      idHojaVida: [data?.idHojaVida ?? this.idHojaVida()],
      nombreCurso: [
        data?.nombreCurso ?? "",
        [Validators.required, Validators.maxLength(255)],
      ],
      graduado: [data?.graduado ?? false, Validators.required],
      numeroHoras: [
        data?.numeroHoras ?? 1,
        [Validators.required, Validators.min(1), Validators.max(9999)],
      ],
      nombreInstitucion: [
        data?.nombreInstitucion ?? "",
        [Validators.required, Validators.maxLength(255)],
      ],
    });
  }

  private patchForm(lista: OtroEstudioHvDto[]) {
    const arr = this.estudiosArray;
    arr.clear();
    lista.forEach((item) => arr.push(this.createEstudioFormGroup(item)));
  }

  agregarEstudio(): void {
    this.estudiosArray.push(this.createEstudioFormGroup());
  }

  eliminarEstudio(index: number): void {
    const group = this.estudiosArray.at(index) as FormGroup | null;
    const nombre = (group?.get("nombreCurso")?.value || "").trim();
    const label = nombre ? `"${nombre}"` : "seleccionado";
    this.confirm
      .open({
        title: "Confirmar eliminación",
        message: `¿Deseas eliminar el estudio ${label}?`,
        type: "delete",
      })
      .subscribe((ok) => {
        if (!ok) return;
        const id = group?.get("id")?.value;
        if (id) {
          this.otrosService.eliminarOtroEstudio(id).subscribe(() => {
            this.estudiosArray.removeAt(index);
            this.cdr.detectChanges();
          });
        } else {
          this.estudiosArray.removeAt(index);
          this.cdr.detectChanges();
        }
      });
  }

  trackEstudio = (control: any, index: number) => control?.value?.id ?? index;

  onSubmit(): void {
    if (!this.estudiosForm.valid) {
      this.markFormGroupTouched(this.estudiosForm);
      return;
    }
    const payload = this.estudiosForm.value.estudios as OtroEstudioHvDto[];
    this.otrosService.crearOtrosEstudios(payload).subscribe((est) =>
      this.estudiosArray.controls.forEach((control, index) => {
        control.patchValue(est[index]);
      })
    );
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
