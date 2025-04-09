import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { PerfilUsuarioResponseDto } from './dto/perfil-usuario-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { ResponseDto } from './dto/response.dto';

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
      throw new ConflictException('E-mail já cadastrado');
    }

    const usuario = await this.usuariosService.create(dto);

    return {
      success: true,
      statusCode: 201,
      message: 'Usuário cadastrado com sucesso',
      data: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo_usuario: usuario.tipo_usuario,
        created_at: usuario.created_at,
      },
    };
  }

  @Post('login')
  async login(@Body() body: { email: string; senha: string }) {
    const usuario = await this.usuariosService.findByEmail(body.email);

    if (!usuario || usuario.senha !== body.senha) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const token = this.authService.gerarToken(usuario);

    return {
      success: true,
      statusCode: 200,
      message: 'Login realizado com sucesso',
      data: {
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          tipo_usuario: usuario.tipo_usuario,
        },
        ...token,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  async perfil(@Request() req): Promise<ResponseDto<PerfilUsuarioResponseDto>> {
    const usuarioId = req.user?.id;
  
    if (!usuarioId) {
      throw new UnauthorizedException('Token JWT inválido ou ausente');
    }
  
    const usuario = await this.usuariosService.findById(usuarioId);
  
    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
  
    const usuarioDto: PerfilUsuarioResponseDto = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipo_usuario: usuario.tipo_usuario,
      foto: usuario.foto,
      biografia: usuario.biografia,
    };
  
    return new ResponseDto({
      success: true,
      statusCode: 200,
      message: 'Perfil do usuário autenticado',
      data: usuarioDto,
    });
  }
}
