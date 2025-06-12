import { IsNotEmpty, IsDateString, IsNumber, IsString, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMentoriaDto {
  @ApiProperty({
    description: 'Data e hora da mentoria',
    example: '2024-01-15T14:30:00Z',
    type: String,
    format: 'date-time',
  })
  @IsDateString()
  data_hora: Date;

  @ApiProperty({
    description: 'Hora da mentoria (formato numérico)',
    example: 14,
    type: Number,
    minimum: 0,
    maximum: 23,
  })
  @IsNumber()
  hora: number;

  @ApiProperty({
    description: 'Preço da mentoria em reais',
    example: 150.00,
    type: Number,
    minimum: 0,
  })
  @IsNumber()
  preco: number;

  @ApiProperty({
    description: 'Título da mentoria',
    example: 'Introdução ao React.js',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({
    description: 'Descrição detalhada da mentoria',
    example: 'Mentoria focada em ensinar os conceitos fundamentais do React.js',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({
    description: 'Modalidade da mentoria',
    example: 'online',
    enum: ['presencial', 'online'],
    type: String,
  })
  @IsString()
  @IsIn(['presencial', 'online'])
  modalidade: string;
}
