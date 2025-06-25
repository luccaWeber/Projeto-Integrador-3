import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mentoria } from './mentoria.entity';
import { CreateMentoriaDto } from './dto/create-mentoria.dto';
import { PerfilAluno } from '../alunos/perfil_aluno.entity';

@Injectable()
export class MentoriasService {
  constructor(
    @InjectRepository(Mentoria)
    private mentoriasRepository: Repository<Mentoria>,
    @InjectRepository(PerfilAluno)
    private perfilAlunoRepository: Repository<PerfilAluno>,
  ) {}

  async create(data: CreateMentoriaDto, mentorId: number) {
    const mentoria = this.mentoriasRepository.create({
      ...data,
      created_at: new Date(),
      mentor: { id: mentorId },
      status: 'disponivel',
    });

    return this.mentoriasRepository.save(mentoria);
  }

  findAll() {
    return this.mentoriasRepository.find({
      relations: ['mentor'],
    });
  }

  findAllByMentorId(mentorId: number) {
    return this.mentoriasRepository.findBy({ mentor: { id: mentorId } });
  }

  findOne(id: number) {
    return this.mentoriasRepository.findOne({
      where: { id },
      relations: ['mentor'],
    });
  }

  // async assinarMentoria(id: number, alunoId: number) {
  //   const mentoria = await this.mentoriasRepository.findOne({ where: { id } });

  //   if (!mentoria) {
  //     throw new Error('Mentoria não encontrada');
  //   }

  //   if (mentoria.status !== 'disponivel') {
  //     throw new Error('Mentoria não está disponível para assinatura');
  //   }

  //   mentoria.status = 'assinada';

  //   return this.mentoriasRepository.save(mentoria);
  // }

  async findByAlunoInterests(alunoId: number) {
    // Buscar o perfil do aluno
    const perfilAluno = await this.perfilAlunoRepository.findOne({
      where: { id_aluno: alunoId }
    });

    if (!perfilAluno || !perfilAluno.areas_interesse || perfilAluno.areas_interesse.length === 0) {
      return [];
    }

    // Buscar mentorias que tenham área de interesse correspondente
    return this.mentoriasRepository
      .createQueryBuilder('mentoria')
      .leftJoinAndSelect('mentoria.mentor', 'mentor')
      .where('mentoria.area IN (:...areas)', { areas: perfilAluno.areas_interesse })
      .getMany();
  }

  remove(id: number) {
    return this.mentoriasRepository.delete(id);
  }
}
