import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { MentoriasService } from './mentorias.service';
import { CreateMentoriaDto } from './dto/create-mentoria.dto';
import { MentoriaResponseDto } from './dto/mentoria-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';

@ApiTags('Mentorias')
@Controller('mentorias')
export class MentoriasController {
  constructor(
    private readonly mentoriasService: MentoriasService,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Criar nova mentoria',
    description:
      'Cria uma nova mentoria. Apenas usuários autenticados do tipo "mentor" podem criar mentorias.',
  })
  @ApiResponse({
    status: 201,
    description: 'Mentoria criada com sucesso',
    type: MentoriaResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Token JWT inválido ou ausente' })
  create(@Body() dto: CreateMentoriaDto, @Request() req) {
    return this.mentoriasService.create(dto, req.user.id);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar todas as mentorias',
    description:
      'Retorna uma lista com todas as mentorias disponíveis na plataforma.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de mentorias recuperada com sucesso',
    type: [MentoriaResponseDto],
  })
  findAll() {
    return this.mentoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar mentoria por ID',
    description: 'Retorna os detalhes de uma mentoria específica.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da mentoria',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Mentoria encontrada',
    type: MentoriaResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Mentoria não encontrada' })
  findOne(@Param('id') id: string) {
    return this.mentoriasService.findOne(+id);
  }

  @Get('mentor/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Buscar mentorias por ID do mentor',
    description: 'Retorna as mentorias de um mentor específico.',
  })
  @ApiResponse({
    status: 200,
    description: 'Mentorias encontradas',
    type: [MentoriaResponseDto],
  })
  @ApiResponse({ status: 404, description: 'Mentoria não encontrada' })
  @ApiResponse({ status: 401, description: 'Token JWT inválido ou ausente' })
  findAllByMentorId(@Param('id') id: string) {
    return this.mentoriasService.findAllByMentorId(+id);
  }

  @Get('aluno/interesses')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Buscar mentorias por área de interesse do aluno',
    description: 'Retorna as mentorias que correspondem às áreas de interesse do aluno logado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Mentorias encontradas',
    type: [MentoriaResponseDto],
  })
  @ApiResponse({ 
    status: 403, 
    description: 'Acesso negado. Apenas usuários do tipo aluno podem acessar esta rota.' 
  })
  @ApiResponse({ status: 401, description: 'Token JWT inválido ou ausente' })
  async findByAlunoInterests(@Request() req) {
    // Verificar se o usuário é do tipo aluno
    const usuario = await this.usuarioRepository.findOne({
      where: { id: req.user.id }
    });

    if (!usuario) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    if (usuario.tipo_usuario !== 'aluno') {
      throw new HttpException(
        'Acesso negado. Apenas usuários do tipo aluno podem acessar esta rota.',
        HttpStatus.FORBIDDEN
      );
    }

    return this.mentoriasService.findByAlunoInterests(req.user.id);
  }

  // @Patch(':id/assinar')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('access-token')
  // @ApiOperation({
  //   summary: 'Assinar mentoria',
  //   description: 'Permite que um aluno se inscreva em uma mentoria disponível.',
  // })
  // @ApiParam({
  //   name: 'id',
  //   description: 'ID da mentoria',
  //   type: 'number',
  //   example: 1,
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Mentoria assinada com sucesso',
  //   type: MentoriaResponseDto,
  // })
  // @ApiResponse({ status: 404, description: 'Mentoria não encontrada' })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Mentoria não está disponível para assinatura',
  // })
  // @ApiResponse({ status: 401, description: 'Token JWT inválido ou ausente' })
  // assinar(@Param('id') id: number, @Request() req) {
  //   const alunoId = req.user.id;
  //   return this.mentoriasService.assinarMentoria(Number(id), alunoId);
  // }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar mentoria',
    description:
      'Remove uma mentoria da plataforma. Apenas o mentor que criou a mentoria pode deletá-la.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID da mentoria',
    type: 'number',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Mentoria deletada com sucesso',
  })
  @ApiResponse({ status: 404, description: 'Mentoria não encontrada' })
  remove(@Param('id') id: string) {
    return this.mentoriasService.remove(+id);
  }
}
