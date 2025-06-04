import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('perfil_aluno')
export class PerfilAluno {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_aluno: number;

  @Column({ nullable: true })
  formacao: string;

  @Column('text', { array: true, nullable: true })
  areas_interesse: string[];

  @CreateDateColumn()
  created_at: Date;
}
