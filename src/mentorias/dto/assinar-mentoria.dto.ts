import { ApiProperty } from '@nestjs/swagger';

export class AssinarMentoriaDto {
  @ApiProperty({
    description: 'ID do aluno que deseja assinar a mentoria',
    example: 2,
    type: Number,
  })
  alunoId: number;
}