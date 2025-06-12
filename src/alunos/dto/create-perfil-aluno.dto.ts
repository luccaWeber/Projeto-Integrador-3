import { ApiProperty } from '@nestjs/swagger';

export class CreatePerfilAlunoDto {
  @ApiProperty({
    description: 'ID do usuário que será o aluno',
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
}
