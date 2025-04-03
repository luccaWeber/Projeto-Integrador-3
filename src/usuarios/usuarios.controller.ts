import {Controller ,Post, Body, Get, Request, UseGuards,} from '@nestjs/common';
  import { UsuariosService } from './usuarios.service';
  import { CreateUsuarioDto } from './dto/create-usuario.dto';
  import { AuthService } from 'src/auth/auth.service';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  
  @Controller('usuarios')
  export class UsuariosController {
    constructor(
      private readonly usuariosService: UsuariosService,
      private readonly authService: AuthService,
    ) {}
  
    @Post('cadastrar')
    async create(@Body() dto: CreateUsuarioDto) {
      const existe = await this.usuariosService.findByEmail(dto.email);
      if (existe) {
        return { erro: 'E-mail já cadastrado.' };
      }
  
      const usuario = await this.usuariosService.create(dto);
      return {
        mensagem: 'Usuário cadastrado com sucesso!',
        usuario,
      };
    }
  
    @Post('login')
    async login(@Body() body: { email: string; senha: string }) {
      const usuario = await this.usuariosService.findByEmailInLogin(body.email);
  
      if (!usuario || usuario.senha !== body.senha) {
        return { erro: 'Usuário ou senha inválidos' };
      }
  
      const token = this.authService.gerarToken(usuario);
  
      return {...token,};
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('perfil')
    async perfil(@Request() req) {
      return {
        mensagem: 'Perfil do usuário autenticado',
        usuario: req.user,
      };
    }
  }
  