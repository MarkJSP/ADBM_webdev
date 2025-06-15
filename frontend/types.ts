// Path: frontend/types.ts

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender?: 'M' | 'F' | 'X';
  phone?: string;
  address?: string;
  enrollmentDate?: string;
  major?: string;
  academicLevelId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateStudentDto {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  gender?: 'M' | 'F' | 'X';
  phone?: string;
  address?: string;
  enrollmentDate?: string;
  major?: string;
  academicLevelId: number;
}

export type UpdateStudentDto = Partial<CreateStudentDto>;
