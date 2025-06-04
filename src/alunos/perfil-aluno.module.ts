import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilAluno } from './perfil_aluno.entity';
import { PerfilAlunoController } from './perfil-aluno.controller';
import { PerfilAlunoService } from './perfil-aluno.service';

@Module({
  imports: [TypeOrmModule.forFeature([PerfilAluno])],
  providers: [PerfilAlunoService],
  controllers: [PerfilAlunoController],
})
export class PerfilAlunoModule {}
