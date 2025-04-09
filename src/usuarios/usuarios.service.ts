import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async create(data: CreateUsuarioDto): Promise<Usuario> {
    const usuario = this.usuariosRepository.create({
      ...data,
      created_at: new Date(),
    });
    return this.usuariosRepository.save(usuario);
  }

  async findByEmailInLogin(email: string): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({ where: { email } });
    if (!usuario) throw new Error('Usuário não encontrado');
    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { id } });
  }  

}
