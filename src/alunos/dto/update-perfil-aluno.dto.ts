import { PartialType } from '@nestjs/mapped-types';
import { CreatePerfilAlunoDto } from './create-perfil-aluno.dto';

export class UpdatePerfilAlunoDto extends PartialType(CreatePerfilAlunoDto) {}
