export class CreateMentorProfileDto {
  usuario_id: number;
  areas_especializacao?: string[];
  disponibilidade?: string;
  nivel_experiencia?: string;
  objetivos?: string;
  certificacoes?: any;
  experiencia_profissional?: string;
  formacao?: string;
  preco?: number;
  formato?: string;
  duracao_mentoria?: number;
  linkedin?: string;
  github?: string;
  portifolio?: string;
}
