import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
