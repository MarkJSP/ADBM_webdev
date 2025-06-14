import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Student } from './student.entity';

@Entity('student_gpas') // Maps to the 'student_gpas' table
export class StudentGpa {
  @PrimaryColumn({ name: 'student_id' }) // Primary key is also a foreign key
  studentId: number;

  @Column({ type: 'decimal', precision: 3, scale: 2 })
  gpa: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  recordedAt: Date;

  // Relationships
  @OneToOne(() => Student, (student) => student.studentGpa, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'student_id' }) // Specifies the foreign key column
  student: Student;
}
