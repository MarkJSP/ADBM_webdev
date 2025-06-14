import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Student } from './student.entity'; // Will create this next

@Entity('academic_levels') // Maps to the 'academic_levels' table
export class AcademicLevel {
  @PrimaryGeneratedColumn({ type: 'tinyint' }) // tinyint for id
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  level: string;

  @OneToMany(() => Student, (student) => student.academicLevel)
  students: Student[];
}