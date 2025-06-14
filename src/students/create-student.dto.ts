// src/students/create-student.dto.ts
import { IsString, IsEmail, IsOptional, IsDateString, IsEnum, IsInt } from 'class-validator';

export class CreateStudentDto {
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsDateString() dateOfBirth: string;
  @IsEnum(['M','F','X']) @IsOptional() gender?: 'M' | 'F' | 'X';
  @IsEmail() email: string;
  @IsString() @IsOptional() phone?: string;
  @IsString() @IsOptional() address?: string;
  @IsDateString() @IsOptional() enrollmentDate?: string;
  @IsString() @IsOptional() major?: string;
  @IsInt() academicLevelId: number;
}

