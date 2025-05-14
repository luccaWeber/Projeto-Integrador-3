import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mentor } from './mentor.entity';
import { MentoresService } from './mentores.service';
import { MentoresController } from './mentores.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Mentor])],
  providers: [MentoresService],
  controllers: [MentoresController],
})
export class MentoresModule {}
