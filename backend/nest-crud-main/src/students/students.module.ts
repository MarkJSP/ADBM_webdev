import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Student } from '../entities/student.entity';
import { AcademicLevel } from '../entities/academic-level.entity';

@Module({
  imports: [
    // Register the Student & AcademicLevel repositories
    TypeOrmModule.forFeature([Student, AcademicLevel]),
  ],
  providers: [StudentsService],
  controllers: [StudentsController],
  exports: [StudentsService],
})
export class StudentsModule {}
