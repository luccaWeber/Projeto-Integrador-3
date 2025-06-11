import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';

@Entity('mentorias')
export class Mentoria {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.mentoriasComoMentor)
  @JoinColumn({ name: 'mentor_id' })
  mentor: Usuario;

  @ManyToOne(() => Usuario, (usuario) => usuario.mentoriasComoAluno, { nullable: true })
  @JoinColumn({ name: 'aluno_id' })
  aluno: Usuario;

  @Column({ type: 'timestamp' })
  data_hora: Date;

  @Column({ type: 'int8' })
  hora: Date;

  @Column('decimal')
  preco: number;

  @Column()
  status: string;

  @Column()
  titulo: string;

  @Column()
  descricao: string;

  @Column()
  modalidade: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;
}
