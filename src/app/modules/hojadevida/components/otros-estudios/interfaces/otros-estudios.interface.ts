export interface OtroEstudioHvDto {
  id: number;
  idHojaVida: number;
  numeroHoras: number;
  graduado: boolean;
  nombreCurso: string;
  nombreInstitucion: string;
}

export type OtroEstudioHvCreateDto = Omit<OtroEstudioHvDto, 'id'>;
export type OtroEstudioHvUpdateDto = Partial<OtroEstudioHvCreateDto> & { id: number };

export interface GraduadoOption { value: boolean; label: string; }
