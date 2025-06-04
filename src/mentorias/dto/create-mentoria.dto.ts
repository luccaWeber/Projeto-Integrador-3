import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class CreateMentoriaDto {
  @IsDateString()
  data_hora: Date;

  @IsNumber()
  preco: number;
}
