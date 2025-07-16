export interface PerfilAcademico {
  titulos: TituloAcademico[];
}

export interface TituloAcademico {
  tituloAcademico: string;
  graduado: 'si' | 'no';
  nivelEducativo: 'tecnico' | 'tecnologo' | 'profesional' | 'especializacion' | 'maestria' | 'doctorado' | 'bachiller';
  institucionEducativa: string;
  semestresAprobados: number;
}

export interface NivelEducativo {
  value: string;
  label: string;
}

export interface GraduadoOption {
  value: 'si' | 'no';
  label: string;
}
