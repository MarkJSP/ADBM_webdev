// Path: frontend/lib/students.ts

import axios from 'axios';
import type { Student, CreateStudentDto, UpdateStudentDto } from '../types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,  // e.g. http://localhost:3000
});

// STUDENTS
export const getAllStudents    = () => api.get<Student[]>('/students');
export const getStudent        = (id: number) => api.get<Student>(`/students/${id}`);
export const createStudent     = (data: CreateStudentDto) => api.post<Student>('/students', data);
export const updateStudent     = (id: number, data: UpdateStudentDto) => api.patch<Student>(`/students/${id}`, data);
export const deleteStudent     = (id: number) => api.delete<void>(`/students/${id}`);

// ACADEMIC LEVELS
export const getAcademicLevels = () => api.get<{ id: number; level: string }[]>('/academic-levels');
export type { Student }
