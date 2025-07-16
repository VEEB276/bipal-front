export interface Experiencia {
  perfilProfesional: string;
  tipoExperiencia: string;
  nombreEmpresa: string;
  nombreCargo: string;
  dependencia: string;
  esTrabajoActual: string;
  fechaInicio: string;
  fechaRetiro: string;
}

export interface TipoExperienciaOption {
  value: string;
  label: string;
}

export interface TrabajoActualOption {
  value: string;
  label: string;
}
