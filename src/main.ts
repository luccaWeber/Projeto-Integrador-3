import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Mentora API')
    .setDescription(
      'API para acesso aos dados da aplicação Mentora.\nConsulte as informaçÕes dos mentores e seus dados para explorar todas as possibilidades e aprender muito mais!',
    )
    .setVersion('1.0')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
// Habilitando o CORS
  app.enableCors({
    origin: '*',
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
