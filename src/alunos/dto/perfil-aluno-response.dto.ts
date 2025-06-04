export class PerfilAlunoResponseDto {
  id: number;
  id_aluno: number;
  formacao?: string;
  areas_interesse?: string[];
  created_at: Date;
}
