import { IsString, Length } from 'class-validator';

export class CreateAcademicLevelDto {
  @IsString()
  @Length(1, 20)
  level: string;
}
