export class CreateUsuarioDto {
    nome: string;
    email: string;
    senha: string;
    foto?: string;
    biografia?: string;
    tipo_usuario: string;
  }