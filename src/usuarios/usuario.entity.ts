import { Mentoria } from 'src/mentorias/mentoria.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column({ nullable: true })
  foto: string;

  @Column({ nullable: true })
  biografia: string;

  @Column({
    type: 'enum',
    enum: ['mentor', 'aluno'],
  })
  tipo_usuario: string;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Mentoria, (mentoria) => mentoria.mentor)
  mentoriasComoMentor: Mentoria[];

  @OneToMany(() => Mentoria, (mentoria) => mentoria.aluno)
  mentoriasComoAluno: Mentoria[];

}
