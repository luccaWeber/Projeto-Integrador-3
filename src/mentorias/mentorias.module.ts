import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentoriasService } from './mentorias.service';
import { MentoriasController } from './mentorias.controller';
import { Mentoria } from './mentoria.entity';
import { Usuario } from '../usuarios/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mentoria, Usuario])],
  controllers: [MentoriasController],
  providers: [MentoriasService],
})
export class MentoriasModule {}