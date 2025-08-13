import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InformacionPersonalService } from './informacion-personal.service';
import { PersonaDto, PersonaCreateDto, PersonaUpdateDto } from '../models';
import { environment } from '../../../../environments/environment';

describe('InformacionPersonalService', () => {
  let service: InformacionPersonalService;
  let httpMock: HttpTestingController;
  
  const mockPersona: PersonaDto = {
    id: 1,
    idTipoDocumento: 1,
    numeroDocumento: '1234567890',
    fechaExpedicionDoc: new Date('2020-01-01'),
    idGenero: 1,
    idEnfoqueDiferencial: 1,
    primerNombre: 'Juan',
    segundoNombre: 'Carlos',
    primerApellido: 'Pérez',
    segundoApellido: 'García',
    fechaNacimiento: new Date('1990-05-15'),
    lugarNacimiento: 'Medellín, Antioquia',
    departamentoResidencia: 'Antioquia',
    ciudadResidencia: 'Medellín',
    direccionResidencia: 'Calle 123 #45-67',
    telefono: '3001234567',
    correo: 'juan.perez@email.com',
    nombreContacto: 'María García',
    telefonoContacto: '3009876543',
    correoContacto: 'maria.garcia@email.com'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InformacionPersonalService]
    });
    service = TestBed.inject(InformacionPersonalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('obtenerInformacionPersonal', () => {
    it('should retrieve personal information by ID', () => {
      const personaId = 1;

      service.obtenerInformacionPersonal(personaId).subscribe(persona => {
        expect(persona).toEqual(mockPersona);
      });

  const req = httpMock.expectOne(`${environment.hojaDeVidaApiUrl}/persona/find-by-id-persona/${personaId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPersona);
    });
  });

  describe('crearInformacionPersonal', () => {
    it('should create new personal information', () => {
      const personaCreate: PersonaCreateDto = { ...mockPersona };
      delete (personaCreate as any).id;

      service.crearInformacionPersonal(personaCreate).subscribe(persona => {
        expect(persona).toEqual(mockPersona);
      });

  const req = httpMock.expectOne(`${environment.hojaDeVidaApiUrl}/persona/create-persona`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(personaCreate);
      req.flush(mockPersona);
    });
  });

  describe('actualizarInformacionPersonal', () => {
    it('should update existing personal information', () => {
      const personaUpdate: PersonaUpdateDto = {
        id: 1,
        primerNombre: 'Juan Carlos'
      };

      service.actualizarInformacionPersonal(personaUpdate).subscribe(persona => {
        expect(persona).toEqual(mockPersona);
      });

  const req = httpMock.expectOne(`${environment.hojaDeVidaApiUrl}/persona/actualizar-persona`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(personaUpdate);
      req.flush(mockPersona);
    });
  });

  describe('buscarPorDocumento', () => {
    it('should search person by document number', () => {
      const numeroDocumento = '1234567890';

      service.buscarPorDocumento(numeroDocumento).subscribe(persona => {
        expect(persona).toEqual(mockPersona);
      });

      const req = httpMock.expectOne(`${environment.hojaDeVidaApiUrl}/persona/find?numero-documento=${numeroDocumento}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockPersona);
    });
  });

  describe('validarDocumentoExistente', () => {
    it('should validate if document exists', () => {
      const numeroDocumento = '1234567890';

      service.validarDocumentoExistente(numeroDocumento).subscribe(existe => {
        expect(existe).toBe(true);
      });

      const req = httpMock.expectOne(`${environment.hojaDeVidaApiUrl}/persona/validar-documento/${numeroDocumento}`);
      expect(req.request.method).toBe('GET');
      req.flush(true);
    });
  });

  describe('validarCorreoExistente', () => {
    it('should validate if email exists', () => {
      const correoElectronico = 'test@email.com';

      service.validarCorreoExistente(correoElectronico).subscribe(existe => {
        expect(existe).toBe(false);
      });

      const req = httpMock.expectOne(`${environment.hojaDeVidaApiUrl}/persona/validar-correo/${encodeURIComponent(correoElectronico)}`);
      expect(req.request.method).toBe('GET');
      req.flush(false);
    });
  });

  describe('error handling', () => {
    it('should handle 404 error properly', () => {
      const personaId = 999;

      service.obtenerInformacionPersonal(personaId).subscribe({
        next: () => fail('Should not succeed'),
        error: (error) => {
          expect(error.message).toBe('La información solicitada no fue encontrada.');
        }
      });

  const req = httpMock.expectOne(`${environment.hojaDeVidaApiUrl}/persona/find-by-id-persona/${personaId}`);
      req.flush('Not found', { status: 404, statusText: 'Not Found' });
    });

    it('should handle 409 conflict error properly', () => {
      const personaCreate: PersonaCreateDto = { ...mockPersona };
      delete (personaCreate as any).id;

      service.crearInformacionPersonal(personaCreate).subscribe({
        next: () => fail('Should not succeed'),
        error: (error) => {
          expect(error.message).toBe('Ya existe un registro con estos datos.');
        }
      });

  const req = httpMock.expectOne(`${environment.hojaDeVidaApiUrl}/persona/create-persona`);
      req.flush('Conflict', { status: 409, statusText: 'Conflict' });
    });
  });
});