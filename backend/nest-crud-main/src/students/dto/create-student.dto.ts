import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  IsEnum,
  IsInt,
  ValidateIf,
} from 'class-validator';

export class CreateStudentDto {
  @IsString() firstName: string;
  @IsString() lastName: string;
  @IsDateString() dateOfBirth: string;
  @IsEnum(['M', 'F', 'X']) @IsOptional() gender?: 'M' | 'F' | 'X';
  @IsEmail() email: string;
  @IsString() @IsOptional() phone?: string;
  @IsString() @IsOptional() address?: string;
  @IsDateString() @IsOptional() enrollmentDate?: string;
  @IsString() @IsOptional() major?: string;

  // Pick existing level (if newLevel is absent)
  @ValidateIf((o) => o.newLevel == null)
  @IsInt() @IsOptional() academicLevelId?: number;

  // Or create a brand‑new one
  @ValidateIf((o) => o.academicLevelId == null)
  @IsString() newLevel: string;
}
