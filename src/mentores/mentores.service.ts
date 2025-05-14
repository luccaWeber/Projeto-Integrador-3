import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mentor } from './mentor.entity';
import { CreateMentorProfileDto } from './dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from './dto/update-mentor-profile.dto';

@Injectable()
export class MentoresService {
  constructor(
    @InjectRepository(Mentor)
    private mentorRepository: Repository<Mentor>,
  ) {}

  async create(dto: CreateMentorProfileDto): Promise<Mentor> {
    const mentor = this.mentorRepository.create(dto);
    return this.mentorRepository.save(mentor);
  }

  async findByUsuarioId(usuario_id: number): Promise<Mentor | null> {
    return this.mentorRepository.findOne({ where: { usuario_id } });
  }

  async getOrFail(usuario_id: number): Promise<Mentor> {
    const mentor = await this.findByUsuarioId(usuario_id);
    if (!mentor) throw new NotFoundException('Perfil de mentor não encontrado');
    return mentor;
  }

  async update(usuario_id: number, dto: UpdateMentorProfileDto): Promise<Mentor> {
    const mentor = await this.getOrFail(usuario_id);
    Object.assign(mentor, dto);
    return this.mentorRepository.save(mentor);
  }

  async delete(usuario_id: number): Promise<void> {
    const mentor = await this.getOrFail(usuario_id);
    await this.mentorRepository.remove(mentor);
  }
}
