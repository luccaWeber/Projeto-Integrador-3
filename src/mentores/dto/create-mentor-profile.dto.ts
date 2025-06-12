import { ApiProperty } from '@nestjs/swagger';

export class CreateMentorProfileDto {
  @ApiProperty({
    description: 'ID do usuário que será o mentor',
    example: 1,
    type: Number,
  })
  usuario_id: number;

  @ApiProperty({
    description: 'Áreas de especialização do mentor',
    example: ['JavaScript', 'Node.js', 'React'],
    type: [String],
    required: false,
  })
  areas_especializacao?: string[];

  @ApiProperty({
    description: 'Nível de experiência do mentor',
    example: 'Senior',
    enum: ['Junior', 'Pleno', 'Senior', 'Especialista'],
    type: String,
    required: false,
  })
  nivel_experiencia?: string;

  @ApiProperty({
    description: 'Objetivos como mentor',
    example: 'Ajudar desenvolvedores iniciantes a evoluir suas habilidades técnicas',
    type: String,
    required: false,
  })
  objetivos?: string;

  @ApiProperty({
    description: 'Certificações do mentor',
    example: { 'AWS': 'Solutions Architect', 'Google': 'Cloud Professional' },
    type: Object,
    required: false,
  })
  certificacoes?: any;

  @ApiProperty({
    description: 'Experiência profissional do mentor',
    example: '5+ anos como desenvolvedor full-stack em empresas de tecnologia',
    type: String,
    required: false,
  })
  experiencia_profissional?: string;

  @ApiProperty({
    description: 'Formação acadêmica do mentor',
    example: 'Bacharel em Ciência da Computação',
    type: String,
    required: false,
  })
  formacao?: string;

  @ApiProperty({
    description: 'URL do perfil LinkedIn',
    example: 'https://linkedin.com/in/joao-silva',
    type: String,
    required: false,
  })
  linkedin?: string;

  @ApiProperty({
    description: 'URL do perfil GitHub',
    example: 'https://github.com/joaosilva',
    type: String,
    required: false,
  })
  github?: string;

  @ApiProperty({
    description: 'URL do portfólio',
    example: 'https://joaosilva.dev',
    type: String,
    required: false,
  })
  portifolio?: string;
}