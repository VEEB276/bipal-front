export interface PersonaDto {
  id?: number;
  idTipoDocumento: number;
  numeroDocumento: string;
  fechaExpedicionDoc: Date; // antes: fechaExpedicionDocumento
  idGenero: number;
  idEnfoqueDiferencial: number;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  fechaNacimiento: Date;
  lugarNacimiento: string;
  departamentoResidencia: string;
  ciudadResidencia: string;
  direccionResidencia: string;
  telefono: string; // antes: numeroTelefono
  correo: string; // antes: correoElectronico
  nombreContacto: string;
  telefonoContacto: string; // antes: numeroTelefonoContacto
  correoContacto: string; // antes: correoElectronicoContacto
  idHojaVida?: number; // nuevo campo backend
}

export interface PersonaCreateDto extends Omit<PersonaDto, 'id'> {}

export interface PersonaUpdateDto extends Partial<PersonaCreateDto> { id: number; }
