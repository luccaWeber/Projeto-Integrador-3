import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  UnauthorizedException,
  ConflictException,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PerfilUsuarioResponseDto } from './dto/perfil-usuario-response.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { ResponseDto } from './dto/response.dto';

@ApiTags('Usuários')
@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly authService: AuthService,
  ) {}

  @Post('cadastrar')
  @ApiOperation({ 
    summary: 'Cadastrar novo usuário',
    description: 'Cria um novo usuário na plataforma. O usuário pode ser do tipo "mentor" ou "aluno".'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuário cadastrado com sucesso',
    schema: {
      example: {
        success: true,
        statusCode: 201,
        message: 'Usuário cadastrado com sucesso',
        data: {
          id: 1,
          nome: 'João Silva',
          email: 'joao.silva@email.com',
          tipo_usuario: 'mentor',
          created_at: '2024-01-15T10:30:00Z'
        }
      }
    }
  })
  @ApiResponse({ status: 409, description: 'E-mail já cadastrado' })
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
  @ApiOperation({ 
    summary: 'Realizar login',
    description: 'Autentica um usuário e retorna um token JWT para acesso aos endpoints protegidos.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Login realizado com sucesso',
    schema: {
      example: {
        success: true,
        statusCode: 200,
        message: 'Login realizado com sucesso',
        data: {
          usuario: {
            id: 1,
            nome: 'João Silva',
            email: 'joao.silva@email.com',
            tipo_usuario: 'mentor'
          },
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() body: LoginDto) {
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
  @ApiBearerAuth('access-token')
  @ApiOperation({ 
    summary: 'Obter perfil do usuário autenticado',
    description: 'Retorna os dados do perfil do usuário autenticado via token JWT.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Perfil do usuário recuperado com sucesso',
    type: ResponseDto<PerfilUsuarioResponseDto>
  })
  @ApiResponse({ status: 401, description: 'Token JWT inválido ou ausente' })
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

  @UseGuards(JwtAuthGuard)
  @Patch('perfil')
  @ApiBearerAuth('access-token')
  @ApiOperation({ 
    summary: 'Atualizar perfil do usuário',
    description: 'Atualiza os dados do perfil do usuário autenticado.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Perfil atualizado com sucesso',
    type: ResponseDto<PerfilUsuarioResponseDto>
  })
  @ApiResponse({ status: 401, description: 'Token JWT inválido ou ausente' })
  async updatePerfil(
    @Request() req,
    @Body() dto: UpdateUsuarioDto,
  ): Promise<ResponseDto<PerfilUsuarioResponseDto>> {
    const usuarioId = req.user?.id;

    if (!usuarioId) {
      throw new UnauthorizedException('Token JWT inválido ou ausente');
    }

    const usuarioAtualizado = await this.usuariosService.update(usuarioId, dto);

    const usuarioDto: PerfilUsuarioResponseDto = {
      id: usuarioAtualizado.id,
      nome: usuarioAtualizado.nome,
      email: usuarioAtualizado.email,
      tipo_usuario: usuarioAtualizado.tipo_usuario,
      foto: usuarioAtualizado.foto,
      biografia: usuarioAtualizado.biografia,
    };

    return new ResponseDto({
      success: true,
      statusCode: 200,
      message: 'Perfil do usuário atualizado com sucesso',
      data: usuarioDto,
    });
  }
}
