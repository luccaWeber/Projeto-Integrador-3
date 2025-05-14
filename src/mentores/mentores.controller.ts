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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MentoresService } from './mentores.service';
import { CreateMentorProfileDto } from './dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from './dto/update-mentor-profile.dto';
import { MentorResponseDto } from './dto/mentor-response.dto';
import { ResponseDto } from 'src/usuarios/dto/response.dto';

@Controller('mentores')
@UseGuards(JwtAuthGuard)
export class MentoresController {
  constructor(private readonly mentoresService: MentoresService) {}

  @Post()
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
