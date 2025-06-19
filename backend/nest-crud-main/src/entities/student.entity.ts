import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AcademicLevel } from './academic-level.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ name: 'first_name', type: 'varchar', length: 50 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 50 })
  lastName: string;

  @Column({ name: 'date_of_birth', type: 'date' })
  dateOfBirth: string;

  @Column({ type: 'enum', enum: ['M', 'F', 'X'], nullable: true })
  gender?: 'M' | 'F' | 'X';

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address?: string;

  @Column({
    name: 'enrollment_date',
    type: 'date',
    default: () => 'CURRENT_DATE',
  })
  enrollmentDate: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  major?: string;

  @Column({ name: 'academic_level_id', type: 'tinyint', unsigned: true })
  academicLevelId: number;

  @ManyToOne(() => AcademicLevel, (al) => al.students, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'academic_level_id' })
  academicLevel: AcademicLevel;
}
