import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { MentoresModule } from './mentores/mentores.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST!,
      port: parseInt(process.env.DB_PORT!, 10),
      username: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
      ssl: { rejectUnauthorized: false },
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsuariosModule,
    AuthModule,
    MentoresModule,
  ],
})
export class AppModule {}
