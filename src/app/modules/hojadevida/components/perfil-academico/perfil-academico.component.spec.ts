import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';

import { PerfilAcademicoComponent } from './perfil-academico.component';

describe('PerfilAcademicoComponent', () => {
  let component: PerfilAcademicoComponent;
  let fixture: ComponentFixture<PerfilAcademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PerfilAcademicoComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatSliderModule,
        MatCardModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with one title form group', () => {
    expect(component.titulosArray.length).toBe(1);
  });

  it('should add a new title when calling agregarTitulo', () => {
    component.agregarTitulo();
    expect(component.titulosArray.length).toBe(2);
  });

  it('should remove a title when calling eliminarTitulo', () => {
    component.agregarTitulo();
    component.eliminarTitulo(1);
    expect(component.titulosArray.length).toBe(1);
  });

  it('should not remove the last title', () => {
    component.eliminarTitulo(0);
    expect(component.titulosArray.length).toBe(1);
  });

  it('should validate required fields', () => {
    const titleFormGroup = component.titulosArray.at(0);
    expect(titleFormGroup.get('tituloAcademico')?.hasError('required')).toBeTruthy();
    expect(titleFormGroup.get('graduado')?.hasError('required')).toBeTruthy();
    expect(titleFormGroup.get('nivelEducativo')?.hasError('required')).toBeTruthy();
    expect(titleFormGroup.get('institucionEducativa')?.hasError('required')).toBeTruthy();
  });
});
