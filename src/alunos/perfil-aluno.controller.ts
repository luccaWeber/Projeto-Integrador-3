import { Controller, Post, Get, Patch, Delete, Body, Request, UseGuards } from '@nestjs/common';
import { PerfilAlunoService } from './perfil-aluno.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ResponseDto } from 'src/usuarios/dto/response.dto';
import { CreatePerfilAlunoDto } from './dto/create-perfil-aluno.dto';
import { PerfilAlunoResponseDto } from './dto/perfil-aluno-response.dto';
import { UpdatePerfilAlunoDto } from './dto/update-perfil-aluno.dto';

@Controller('alunos')
@UseGuards(JwtAuthGuard)
export class PerfilAlunoController {
  constructor(private readonly service: PerfilAlunoService) {}

  @Post()
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
