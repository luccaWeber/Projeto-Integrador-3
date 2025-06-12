import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
    @ApiProperty({
        description: 'Nome completo do usuário',
        example: 'João Silva',
        type: String,
    })
    nome: string;

    @ApiProperty({
        description: 'Email do usuário (deve ser único)',
        example: 'joao.silva@email.com',
        type: String,
    })
    email: string;

    @ApiProperty({
        description: 'Senha do usuário (mínimo 6 caracteres)',
        example: 'minhasenha123',
        type: String,
        minLength: 6,
    })
    senha: string;

    @ApiProperty({
        description: 'URL da foto de perfil do usuário',
        example: 'https://exemplo.com/foto.jpg',
        type: String,
        required: false,
    })
    foto?: string;

    @ApiProperty({
        description: 'Biografia do usuário',
        example: 'Desenvolvedor apaixonado por tecnologia',
        type: String,
        required: false,
    })
    biografia?: string;

    @ApiProperty({
        description: 'Tipo de usuário na plataforma',
        example: 'mentor',
        enum: ['mentor', 'aluno'],
        type: String,
    })
    tipo_usuario: string;
}