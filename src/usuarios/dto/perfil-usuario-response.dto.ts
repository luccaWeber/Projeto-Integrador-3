export class PerfilUsuarioResponseDto {
    id: number;
    nome: string;
    email: string;
    foto?: string | null;
    biografia?: string | null;
    tipo_usuario: string;
  }