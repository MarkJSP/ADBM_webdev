// src/students/students.service.ts

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository }      from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateStudentDto }      from './dto/create-student.dto';
import { UpdateStudentDto }      from './dto/update-student.dto';
import { Student }               from '../entities/student.entity';
import { AcademicLevel }         from '../entities/academic-level.entity';

@Injectable()
export class StudentsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(AcademicLevel)
    private readonly levelRepo: Repository<AcademicLevel>,
  ) {}

  /** Create a new student, linking or creating an academic level */
  async create(dto: CreateStudentDto): Promise<Student> {
    return this.dataSource.transaction(async manager => {
      let level: AcademicLevel;

      // 1) Link existing level or create new one
      if (dto.academicLevelId != null) {
        // GUARANTEED non-null, throws 404 if not found
        level = await manager.findOneOrFail(AcademicLevel, {
          where: { id: dto.academicLevelId },
        });
      } else if (dto.newLevel) {
        level = manager.create(AcademicLevel, { level: dto.newLevel });
        level = await manager.save(level);
      } else {
        throw new BadRequestException(
          'Must provide either academicLevelId or newLevel',
        );
      }

      // 2) Create the student
      const student = manager.create(Student, {
        firstName:      dto.firstName,
        lastName:       dto.lastName,
        email:          dto.email,
        dateOfBirth:    dto.dateOfBirth,
        gender:         dto.gender,
        phone:          dto.phone,
        address:        dto.address,
        enrollmentDate: dto.enrollmentDate,
        major:          dto.major,
        academicLevel:  level,
      });
      const saved = await manager.save(student);

      // 3) Return with relations
      return manager.findOneOrFail(Student, {
        where:     { id: saved.id },
        relations: ['academicLevel'],
      });
    });
  }

  /** Get all students with their academic level */
  findAll(): Promise<Student[]> {
    return this.studentRepo.find({ relations: ['academicLevel'] });
  }

  /** Get one student by ID */
  async findOne(id: number): Promise<Student> {
    const s = await this.studentRepo.findOne({
      where:     { id },
      relations: ['academicLevel'],
    });
    if (!s) throw new NotFoundException(`Student #${id} not found`);
    return s;
  }

  /** Update a student and handle academic level logic */
  async update(id: number, dto: UpdateStudentDto): Promise<Student> {
    return this.dataSource.transaction(async manager => {
      // 1) Load student + current level
      const student = await manager.findOne(Student, {
        where:     { id },
        relations: ['academicLevel'],
      });
      if (!student) throw new NotFoundException(`Student #${id} not found`);

      // 2) Level change
      if (dto.newLevel) {
        let lvl = await manager.findOne(AcademicLevel, {
          where: { level: dto.newLevel },
        });
        if (!lvl) {
          lvl = manager.create(AcademicLevel, { level: dto.newLevel });
          lvl = await manager.save(lvl);
        }
        student.academicLevel = lvl;
      } else if (dto.academicLevelId != null) {
        // use findOneOrFail to avoid null
        const lvl = await manager.findOneOrFail(AcademicLevel, {
          where: { id: dto.academicLevelId },
        });
        student.academicLevel = lvl;
      }

      // 3) Mirror name changes onto the level row
      if (dto.firstName || dto.lastName) {
        student.academicLevel.firstName = dto.firstName ?? student.firstName;
        student.academicLevel.lastName  = dto.lastName  ?? student.lastName;
        await manager.save(student.academicLevel);
      }

      // 4) Merge other fields
      Object.assign(student, {
        firstName:      dto.firstName      ?? student.firstName,
        lastName:       dto.lastName       ?? student.lastName,
        email:          dto.email          ?? student.email,
        dateOfBirth:    dto.dateOfBirth    ?? student.dateOfBirth,
        gender:         dto.gender         ?? student.gender,
        phone:          dto.phone          ?? student.phone,
        address:        dto.address        ?? student.address,
        enrollmentDate: dto.enrollmentDate ?? student.enrollmentDate,
        major:          dto.major          ?? student.major,
      });

      // 5) Save and return fresh copy
      await manager.save(student);
      return manager.findOneOrFail(Student, {
        where:     { id },
        relations: ['academicLevel'],
      });
    });
  }

  /** Delete a student by ID */
  async remove(id: number): Promise<void> {
    const result = await this.studentRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Student #${id} not found`);
    }
  }
}
