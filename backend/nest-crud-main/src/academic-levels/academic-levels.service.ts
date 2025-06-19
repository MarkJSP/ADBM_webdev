import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }      from 'typeorm';
import { AcademicLevel }   from '../entities/academic-level.entity';
import { CreateAcademicLevelDto } from './dto/create-academic-level.dto';
import { UpdateAcademicLevelDto } from './dto/update-academic-level.dto';

@Injectable()
export class AcademicLevelsService {
  constructor(
    @InjectRepository(AcademicLevel)
    private readonly repo: Repository<AcademicLevel>,
  ) {}

  async create(dto: CreateAcademicLevelDto): Promise<AcademicLevel> {
    const level = this.repo.create(dto);
    return this.repo.save(level);
  }

  findAll(): Promise<AcademicLevel[]> {
    return this.repo.find({ relations: ['students'] });
  }

  async findOne(id: number): Promise<AcademicLevel> {
    const level = await this.repo.findOne({
      where: { id },
      relations: ['students'],
    });
    if (!level) throw new NotFoundException(`AcademicLevel #${id} not found`);
    return level;
  }

  async update(id: number, dto: UpdateAcademicLevelDto): Promise<AcademicLevel> {
    const level = await this.findOne(id);
    Object.assign(level, dto);
    return this.repo.save(level);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`AcademicLevel #${id} not found`);
    }
  }
}
