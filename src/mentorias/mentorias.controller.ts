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
} from '@nestjs/common';
import { MentoriasService } from './mentorias.service';
import { CreateMentoriaDto } from './dto/create-mentoria.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('mentorias')
export class MentoriasController {
  constructor(private readonly mentoriasService: MentoriasService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateMentoriaDto, @Request() req) {
    return this.mentoriasService.create(dto, req.user.id); 
  }

  @Get()
  findAll() {
    return this.mentoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mentoriasService.findOne(+id);
  }

  @Patch(':id/assinar')
  @UseGuards(JwtAuthGuard)
  assinar(@Param('id') id: number, @Request() req) {
    const alunoId = req.user.id;
    return this.mentoriasService.assinarMentoria(Number(id), alunoId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mentoriasService.remove(+id);
  }
}
