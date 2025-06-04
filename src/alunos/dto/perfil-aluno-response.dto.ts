export class PerfilAlunoResponseDto {
  id: number;
  id_aluno: number;
  fomacao?: string;
  areas_interesse?: string[];
  created_at: Date;
}
