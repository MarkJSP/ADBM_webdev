import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';
import { CreateStudentDto } from './create-student.dto';
import { UpdateStudentDto } from './update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly repo: Repository<Student>,
  ) {}

  async create(dto: CreateStudentDto): Promise<Student> {
    const student = this.repo.create(dto);
    return this.repo.save(student);
  }

  findAll(): Promise<Student[]> {
    return this.repo.find({ relations: ['academicLevel', 'studentGpa'] });
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.repo.findOne({
      where: { id },
      relations: ['academicLevel', 'studentGpa'],
    });
    if (!student) throw new NotFoundException(`Student #${id} not found`);
    return student;
  }

  async update(id: number, dto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);
    Object.assign(student, dto);
    return this.repo.save(student);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Student #${id} not found`);
  }
}
