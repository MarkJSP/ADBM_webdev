import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicLevel } from '../entities/academic-level.entity';

@Controller('academic-levels')
export class AcademicLevelsController {
  constructor(
    @InjectRepository(AcademicLevel)
    private readonly repo: Repository<AcademicLevel>,
  ) {}

  @Get()
  findAll() {
    return this.repo.find();
  }
}
