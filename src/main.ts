import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Mentora API')
    .setDescription(
      'API para acesso aos dados da aplicação Mentora.\n' +
      'A plataforma Mentora conecta mentores experientes com alunos que desejam aprender e evoluir.\n' +
      'Explore as funcionalidades da API e descubra todas as possibilidades disponíveis!\n\n' +
      '## Funcionalidades principais:\n' +
      '- **Usuários**: Cadastro e gerenciamento de perfis de usuários\n' +
      '- **Mentores**: Criação e manutenção de perfis de mentores\n' +
      '- **Alunos**: Gerenciamento de perfis de alunos\n' +
      '- **Mentorias**: Criação, visualização e inscrição em mentorias\n' +
      '- **Autenticação**: Sistema de login e autorização JWT\n\n' +
      '## Como usar:\n' +
      '1. Cadastre-se como usuário escolhendo o tipo (mentor ou aluno)\n' +
      '2. Faça login para obter o token de acesso\n' +
      '3. Complete seu perfil específico (mentor ou aluno)\n' +
      '4. Explore as mentorias disponíveis ou crie suas próprias (mentores)\n' +
      '5. Inscreva-se em mentorias (alunos) ou gerencie suas mentorias (mentores)'
    )
    .setVersion('1.0')
    .addTag('Usuários', 'Operações relacionadas ao cadastro e gerenciamento de usuários')
    .addTag('Autenticação', 'Endpoints para login e validação de tokens')
    .addTag('Mentores', 'Gerenciamento de perfis e dados de mentores')
    .addTag('Alunos', 'Gerenciamento de perfis e dados de alunos')
    .addTag('Mentorias', 'Criação, visualização e inscrição em mentorias')
    .addBearerAuth(
      {
        description: 'Token JWT para autenticação',
        name: 'Authorization',
        bearerFormat: 'JWT',
        scheme: 'bearer',
        type: 'http',
        in: 'Header'
      },
      'access-token'
    )
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });

  // Habilitando o CORS
  app.enableCors({
    origin: '*',
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
