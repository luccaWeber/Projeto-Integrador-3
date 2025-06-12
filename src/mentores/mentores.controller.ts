import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  UseGuards,
  Request,
  ConflictException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MentoresService } from './mentores.service';
import { CreateMentorProfileDto } from './dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from './dto/update-mentor-profile.dto';
import { MentorResponseDto } from './dto/mentor-response.dto';
import { ResponseDto } from 'src/usuarios/dto/response.dto';

@ApiTags('Mentores')
@Controller('mentores')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class MentoresController {
  constructor(private readonly mentoresService: MentoresService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar perfil de mentor',
    description: 'Cria um perfil de mentor para o usuário autenticado. Cada usuário pode ter apenas um perfil de mentor.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Perfil de mentor criado com sucesso',
    type: ResponseDto<MentorResponseDto>
  })
  @ApiResponse({ status: 409, description: 'Perfil de mentor já existe' })
  @ApiResponse({ status: 401, description: 'Token JWT inválido ou ausente' })
  async create(@Request() req, @Body() dto: CreateMentorProfileDto) {
    const existing = await this.mentoresService.findByUsuarioId(req.user.id);
    if (existing) throw new ConflictException('Perfil de mentor já existe');

    dto.usuario_id = req.user.id;
    const mentor = await this.mentoresService.create(dto);

    return new ResponseDto<MentorResponseDto>({
      success: true,
      statusCode: 201,
      message: 'Perfil de mentor criado com sucesso',
      data: mentor,
    });
  }

  @Get('me')
  @ApiOperation({ 
    summary: 'Obter perfil de mentor',
    description: 'Retorna o perfil de mentor do usuário autenticado.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Perfil do mentor recuperado com sucesso',
    type: ResponseDto<MentorResponseDto>
  })
  @ApiResponse({ status: 404, description: 'Perfil de mentor não encontrado' })
  @ApiResponse({ status: 401, description: 'Token JWT inválido ou ausente' })
  async getProfile(@Request() req) {
    const mentor = await this.mentoresService.getOrFail(req.user.id);

    return new ResponseDto<MentorResponseDto>({
      success: true,
      statusCode: 200,
      message: 'Perfil do mentor recuperado com sucesso',
      data: mentor,
    });
  }

  @Patch('me')
  @ApiOperation({ 
    summary: 'Atualizar perfil de mentor',
    description: 'Atualiza os dados do perfil de mentor do usuário autenticado.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Perfil do mentor atualizado com sucesso',
    type: ResponseDto<MentorResponseDto>
  })
  @ApiResponse({ status: 404, description: 'Perfil de mentor não encontrado' })
  @ApiResponse({ status: 401, description: 'Token JWT inválido ou ausente' })
  async updateProfile(@Request() req, @Body() dto: UpdateMentorProfileDto) {
    const mentor = await this.mentoresService.update(req.user.id, dto);

    return new ResponseDto<MentorResponseDto>({
      success: true,
      statusCode: 200,
      message: 'Perfil do mentor atualizado com sucesso',
      data: mentor,
    });
  }

  @Delete('me')
  @ApiOperation({ 
    summary: 'Deletar perfil de mentor',
    description: 'Remove o perfil de mentor do usuário autenticado permanentemente.'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Perfil de mentor deletado com sucesso',
    type: ResponseDto<null>
  })
  @ApiResponse({ status: 404, description: 'Perfil de mentor não encontrado' })
  @ApiResponse({ status: 401, description: 'Token JWT inválido ou ausente' })
  async deleteProfile(@Request() req) {
    await this.mentoresService.delete(req.user.id);

    return new ResponseDto<null>({
      success: true,
      statusCode: 200,
      message: 'Perfil de mentor deletado com sucesso',
      data: null,
    });
  }
}
