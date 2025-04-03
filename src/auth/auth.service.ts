import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuarios/usuario.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  gerarToken(usuario: Usuario) {
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
      tipo_usuario: usuario.tipo_usuario,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  verificarToken(token: string) {
    return this.jwtService.verify(token);
  }
}
