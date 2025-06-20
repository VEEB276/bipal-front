export interface PersonaDto {
  id?: number;
  idTipoDocumento: number;
  numeroDocumento: string;
  fechaExpedicionDocumento: Date;
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
  numeroTelefono: string;
  correoElectronico: string;
  nombreContacto: string;
  numeroTelefonoContacto: string;
  correoElectronicoContacto: string;
}

export interface PersonaCreateDto extends Omit<PersonaDto, 'id'> {}

export interface PersonaUpdateDto extends Partial<PersonaCreateDto> {
  id: number;
}
