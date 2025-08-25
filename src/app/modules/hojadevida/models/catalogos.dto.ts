// Interfaces para catálogos básicos provenientes del backend (DTO Java)
// Mantener nombres y tipos alineados a los DTOs: id, nombre, descripcion, habilitado

export interface TipoDocumentoDto {
  id: number;
  nombre: string;
  descripcion?: string;
  habilitado?: boolean;
}

export interface GeneroDto {
  id: number;
  nombre: string;
  descripcion?: string;
  habilitado?: boolean;
}

export interface EnfoqueDiferencialDto {
  id: number;
  nombre: string;
  descripcion?: string;
  habilitado?: boolean;
}
