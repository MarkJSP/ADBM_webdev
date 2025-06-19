// frontend/types.ts

export interface CreateStudentDto {
  firstName:       string;
  lastName:        string;
  email:           string;
  dateOfBirth:     string;
  gender?:         'M' | 'F' | 'X';
  phone?:          string;
  address?:        string;
  enrollmentDate?: string;
  major?:          string;

  // Either pick existing…
  academicLevelId?: number;
  // …or create a new one
  newLevel?:        string;
}

// On update, every field is optional
export type UpdateStudentDto = Partial<CreateStudentDto>;

export interface AcademicLevel {
  id:    number;
  level: string;
  // (we no longer need names here on the front end)
}

export interface Student {
  id:             number;
  firstName:      string;
  lastName:       string;
  email:          string;
  dateOfBirth:    string;
  gender?:        'M' | 'F' | 'X';
  phone?:         string;
  address?:       string;
  enrollmentDate?:string;
  major?:         string;
  academicLevel:  AcademicLevel;
}
