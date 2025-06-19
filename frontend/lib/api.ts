// frontend/lib/api.ts
import axios from 'axios';

// POINT at your Nest server (default 3001) instead of 3000
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});
