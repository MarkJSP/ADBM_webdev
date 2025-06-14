import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { AcademicLevel } from './academic-level.entity';
import { StudentGpa } from './student-gpa.entity'; // Will create this next

@Entity('students') // Maps to the 'students' table
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  firstName: string; // TypeORM converts camelCase to snake_case by default for columns

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: ['M', 'F', 'X'], nullable: true })
  gender: 'M' | 'F' | 'X';

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  enrollmentDate: Date;

  @Column({ type: 'varchar', length: 100, nullable: true })
  major: string;

  @Column({ name: 'academic_level_id', type: 'tinyint' }) // Explicitly map to database column name
  academicLevelId: number; // Foreign key column

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => AcademicLevel, (academicLevel) => academicLevel.students, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'academic_level_id' }) // Specifies the foreign key column
  academicLevel: AcademicLevel;

  @OneToOne(() => StudentGpa, (studentGpa) => studentGpa.student)
  studentGpa: StudentGpa;
}
