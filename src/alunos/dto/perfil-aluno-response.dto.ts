import { ApiProperty } from '@nestjs/swagger';

export class PerfilAlunoResponseDto {
  @ApiProperty({
    description: 'ID único do perfil do aluno',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'ID do usuário associado ao aluno',
    example: 2,
    type: Number,
  })
  id_aluno: number;

  @ApiProperty({
    description: 'Formação acadêmica do aluno',
    example: 'Bacharel em Sistemas de Informação',
    type: String,
    required: false,
  })
  formacao?: string;

  @ApiProperty({
    description: 'Áreas de interesse para aprendizado',
    example: ['JavaScript', 'Python', 'Machine Learning'],
    type: [String],
    required: false,
  })
  areas_interesse?: string[];

  @ApiProperty({
    description: 'Data de criação do perfil',
    example: '2024-01-15T10:30:00Z',
    type: Date,
  })
  created_at: Date;
}
