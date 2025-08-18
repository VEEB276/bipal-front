export interface ExperienciaHvDto {
  id: number | null;
  idHojaVida: number | null;
  idTipoExperiencia: number | null;
  descripcionPerfil: string;
  nombreEmpresa: string;
  nombreCargo: string;
  dependenciaCargo: string;
  fechaDesde: Date | string | null; // Mantener Date en front; serializar al enviar
  fechaHasta: Date | string | null;
}

export type UpsertExperienciaHvDto = ExperienciaHvDto; // backend usa misma lista para create/update

export interface TipoExperienciaDto {
  id: number;
  nombre: string;
  descripcion: string;
  habilitado: boolean;
}

export interface TipoExperienciaOption {
  value: number;
  label: string;
}
