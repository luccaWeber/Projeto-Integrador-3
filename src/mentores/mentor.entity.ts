import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('perfil_mentor')
export class Mentor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuario_id: number;

  @Column('text', { array: true, nullable: true })
  areas_especializacao: string[];

  @Column({ nullable: true })
  disponibilidade: string;

  @Column({ nullable: true })
  nivel_experiencia: string;

  @Column({ nullable: true })
  objetivos: string;

  @Column('jsonb', { nullable: true })
  certificacoes: Record<string, any>;

  @Column({ nullable: true })
  experiencia_profissional: string;

  @Column({ nullable: true })
  formacao: string;

  @Column('numeric', { nullable: true })
  preco: number;

  @Column({ nullable: true })
  formato: string;

  @Column('numeric', { nullable: true })
  duracao_mentoria: number;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true })
  github: string;

  @Column({ nullable: true })
  portifolio: string;
}
