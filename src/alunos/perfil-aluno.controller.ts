import { Controller, Post, Get, Patch, Delete, Body, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PerfilAlunoService } from './perfil-aluno.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResponseDto } from 'src/usuarios/dto/response.dto';
import { CreatePerfilAlunoDto } from './dto/create-perfil-aluno.dto';
import { PerfilAlunoResponseDto } from './dto/perfil-aluno-response.dto';
import { UpdatePerfilAlunoDto } from './dto/update-perfil-aluno.dto';

@ApiTags('Alunos')
@Controller('alunos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class PerfilAlunoController {
  constructor(private readonly service: PerfilAlunoService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar perfil de aluno',
    description: 'Cria um perfil de aluno para o usuário autenticado.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Perfil de aluno criado com sucesso',
    type: ResponseDto<PerfilAlunoResponseDto>
  })
  @ApiResponse({ status: 401, description: 'Token JWT inválido ou ausente' })
  async create(@Request() req, @Body() dto: CreatePerfilAlunoDto) {
    dto.id_aluno = req.user.id;
    const result = await this.service.create(dto);
    return new ResponseDto<PerfilAlunoResponseDto>({
      success: true,
      statusCode: 201,
      message: 'Perfil de aluno criado com sucesso',
      data: result,
    });
  }

  @Get('me')
  @ApiOperation({ 
    summary: 'Obter perfil de aluno',
    description: 'Retorna o perfil de aluno do usuário autenticado.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Perfil de aluno encontrado',
    type: ResponseDto<PerfilAlunoResponseDto>
  })
  @ApiResponse({ status: 404, description: 'Perfil de aluno não encontrado' })
  @ApiResponse({ status: 401, description: 'Token JWT inválido ou ausente' })
  async get(@Request() req) {
    const result = await this.service.findByAlunoId(req.user.id);
    return new ResponseDto<PerfilAlunoResponseDto>({
      success: true,
      statusCode: 200,
      message: 'Perfil de aluno encontrado',
      data: result,
    });
  }

  @Patch('me')
  @ApiOperation({ 
    summary: 'Atualizar perfil de aluno',
    description: 'Atualiza os dados do perfil de aluno do usuário autenticado.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Perfil de aluno atualizado',
    type: ResponseDto<PerfilAlunoResponseDto>
  })
  @ApiResponse({ status: 404, description: 'Perfil de aluno não encontrado' })
  @ApiResponse({ status: 401, description: 'Token JWT inválido ou ausente' })
  async update(@Request() req, @Body() dto: UpdatePerfilAlunoDto) {
    const result = await this.service.update(req.user.id, dto);
    return new ResponseDto<PerfilAlunoResponseDto>({
      success: true,
      statusCode: 200,
      message: 'Perfil de aluno atualizado',
      data: result,
    });
  }

  @Delete('me')
  @ApiOperation({ 
    summary: 'Deletar perfil de aluno',
    description: 'Remove o perfil de aluno do usuário autenticado permanentemente.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Perfil de aluno deletado com sucesso',
    type: ResponseDto<null>
  })
  @ApiResponse({ status: 404, description: 'Perfil de aluno não encontrado' })
  @ApiResponse({ status: 401, description: 'Token JWT inválido ou ausente' })
  async delete(@Request() req) {
    await this.service.delete(req.user.id);
    return new ResponseDto({
      success: true,
      statusCode: 200,
      message: 'Perfil de aluno deletado com sucesso',
      data: null,
    });
  }
}
