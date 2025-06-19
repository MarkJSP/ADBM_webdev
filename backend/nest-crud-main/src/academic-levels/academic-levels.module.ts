// File: backend/nest-crud-main/src/academic-levels/academic-levels.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AcademicLevelsController } from './academic-levels.controller';
import { AcademicLevelsService }    from './academic-levels.service';
import { AcademicLevel }            from '../entities/academic-level.entity';

@Module({
  imports: [
    // Make the AcademicLevel repository available to this module
    TypeOrmModule.forFeature([AcademicLevel]),
  ],
  controllers: [AcademicLevelsController],
  providers:  [AcademicLevelsService],
  exports:    [AcademicLevelsService], // only if other modules need to inject it
})
export class AcademicLevelsModule {}
