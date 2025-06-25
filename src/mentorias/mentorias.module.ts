import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentoriasService } from './mentorias.service';
import { MentoriasController } from './mentorias.controller';
import { Mentoria } from './mentoria.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { PerfilAluno } from '../alunos/perfil_aluno.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mentoria, Usuario, PerfilAluno])],
  controllers: [MentoriasController],
  providers: [MentoriasService],
})
export class MentoriasModule {}