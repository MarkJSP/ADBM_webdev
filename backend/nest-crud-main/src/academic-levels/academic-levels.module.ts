import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicLevelsController } from './academic-levels.controller';
import { AcademicLevel } from '../entities/academic-level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademicLevel])],
  controllers: [AcademicLevelsController],
})
export class AcademicLevelsModule {}
