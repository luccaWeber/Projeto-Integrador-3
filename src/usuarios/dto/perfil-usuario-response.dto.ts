import { ApiProperty } from '@nestjs/swagger';

export class PerfilUsuarioResponseDto {
    @ApiProperty({
        description: 'ID único do usuário',
        example: 1,
        type: Number,
    })
    id: number;

    @ApiProperty({
        description: 'Nome completo do usuário',
        example: 'João Silva',
        type: String,
    })
    nome: string;

    @ApiProperty({
        description: 'Email do usuário',
        example: 'joao.silva@email.com',
        type: String,
    })
    email: string;

    @ApiProperty({
        description: 'URL da foto de perfil do usuário',
        example: 'https://exemplo.com/foto.jpg',
        type: String,
        nullable: true,
        required: false,
    })
    foto?: string | null;

    @ApiProperty({
        description: 'Biografia do usuário',
        example: 'Desenvolvedor apaixonado por tecnologia',
        type: String,
        nullable: true,
        required: false,
    })
    biografia?: string | null;

    @ApiProperty({
        description: 'Tipo de usuário na plataforma',
        example: 'mentor',
        enum: ['mentor', 'aluno'],
        type: String,
    })
    tipo_usuario: string;
}