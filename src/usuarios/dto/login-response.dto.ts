import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'Dados do usuário autenticado',
    type: Object,
  })
  usuario: {
    id: number;
    nome: string;
    email: string;
    tipo_usuario: string;
  };

  @ApiProperty({
    description: 'Token JWT para autenticação',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    type: String,
  })
  access_token: string;
} 