import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerfilAluno } from './perfil_aluno.entity';
import { CreatePerfilAlunoDto } from './dto/create-perfil-aluno.dto';
import { UpdatePerfilAlunoDto } from './dto/update-perfil-aluno.dto';

@Injectable()
export class PerfilAlunoService {
  constructor(
    @InjectRepository(PerfilAluno)
    private repository: Repository<PerfilAluno>,
  ) {}

  async create(dto: CreatePerfilAlunoDto): Promise<PerfilAluno> {
    const entity = this.repository.create(dto);
    return this.repository.save(entity);
  }

  async findByAlunoId(id_aluno: number): Promise<PerfilAluno> {
    const aluno = await this.repository.findOne({ where: { id_aluno } });
    if (!aluno) throw new NotFoundException('Perfil de aluno não encontrado');
    return aluno;
  }

  async update(id_aluno: number, dto: UpdatePerfilAlunoDto): Promise<PerfilAluno> {
    const entity = await this.findByAlunoId(id_aluno);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async delete(id_aluno: number): Promise<void> {
    const entity = await this.findByAlunoId(id_aluno);
    await this.repository.remove(entity);
  }
}
