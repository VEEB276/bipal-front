// Interfaces alineadas con EstudioHVDTO del backend
// EstudioHVDTO: { id, idHojaVida, idNivelEducativo, graduado (Boolean), semestresAprobados, nombreTitulo, nombreInstitucion }

export interface EstudioHvDto {
  id?: number;
  idHojaVida?: number;
  idNivelEducativo: number; // referencia catálogo nivel educativo
  graduado: boolean;
  semestresAprobados: number;
  nombreTitulo: string;
  nombreInstitucion: string;
}

export type EstudioHvCreateDto = Omit<EstudioHvDto, 'id'>;
export type EstudioHvUpdateDto = Partial<EstudioHvCreateDto> & { id: number };

// Catálogo nivel educativo (search-all-nivel-educativo)
export interface NivelEducativoDto {
  id: number;
  nombre: string;
  // Agrega aquí cualquier otro campo que retorne el backend
}

// Colección de estudios por persona
export interface EstudiosPorPersonaResponse extends Array<EstudioHvDto> {}

// (Opcional) Alias para mantener compatibilidad temporal con el componente hasta que se adapte
export interface PerfilAcademico {
  estudios: EstudioHvDto[];
}
