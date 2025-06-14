// example: src/lib/students.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // http://localhost:3000
});

// e.g.
export const getAllStudents = () => api.get('/students');
