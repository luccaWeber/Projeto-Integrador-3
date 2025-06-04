export class CreateMentorProfileDto {
  usuario_id: number;
  areas_especializacao?: string[];
  nivel_experiencia?: string;
  objetivos?: string;
  certificacoes?: any;
  experiencia_profissional?: string;
  fomacao?: string;
  linkedin?: string;
  github?: string;
  portifolio?: string;
}