import { IsNotEmpty, IsDateString, IsNumber, IsString, IsIn } from 'class-validator';

export class CreateMentoriaDto {
  @IsDateString()
  data_hora: Date;

  @IsNumber()
  hora: number;

  @IsNumber()
  preco: number;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsIn(['presencial', 'online'])
  modalidade: string;
}
