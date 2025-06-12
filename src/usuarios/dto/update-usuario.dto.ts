import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsuarioDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiProperty({
    description: 'Nova senha do usuário (mínimo 6 caracteres)',
    example: 'novasenha123',
    type: String,
    minLength: 6,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  senha?: string;

  @ApiProperty({
    description: 'URL da foto de perfil do usuário',
    example: 'https://exemplo.com/nova-foto.jpg',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  foto?: string;

  @ApiProperty({
    description: 'Biografia do usuário',
    example: 'Desenvolvedor sênior especializado em Node.js',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsString()
  biografia?: string;
} 