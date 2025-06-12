import { ApiProperty } from '@nestjs/swagger';

export class MentoriaResponseDto {
  @ApiProperty({
    description: 'ID único da mentoria',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Dados do mentor responsável pela mentoria',
    type: Object,
  })
  mentor: {
    id: number;
    nome: string;
    email: string;
  };

  @ApiProperty({
    description: 'Dados do aluno inscrito na mentoria (quando aplicável)',
    type: Object,
    nullable: true,
    required: false,
  })
  aluno?: {
    id: number;
    nome: string;
    email: string;
  };

  @ApiProperty({
    description: 'Data e hora da mentoria',
    example: '2024-01-15T14:30:00Z',
    type: Date,
  })
  data_hora: Date;

  @ApiProperty({
    description: 'Hora da mentoria (formato numérico)',
    example: 14,
    type: Number,
  })
  hora: Date;

  @ApiProperty({
    description: 'Preço da mentoria em reais',
    example: 150.00,
    type: Number,
  })
  preco: number;

  @ApiProperty({
    description: 'Status atual da mentoria',
    example: 'disponivel',
    enum: ['disponivel', 'assinada', 'concluida', 'cancelada'],
    type: String,
  })
  status: string;

  @ApiProperty({
    description: 'Título da mentoria',
    example: 'Introdução ao React.js',
    type: String,
  })
  titulo: string;

  @ApiProperty({
    description: 'Descrição detalhada da mentoria',
    example: 'Mentoria focada em ensinar os conceitos fundamentais do React.js',
    type: String,
  })
  descricao: string;

  @ApiProperty({
    description: 'Modalidade da mentoria',
    example: 'online',
    enum: ['presencial', 'online'],
    type: String,
  })
  modalidade: string;

  @ApiProperty({
    description: 'Data de criação da mentoria',
    example: '2024-01-15T10:30:00Z',
    type: Date,
  })
  created_at: Date;
} 