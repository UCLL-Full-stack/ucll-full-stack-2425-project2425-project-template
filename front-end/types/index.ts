
export type User = {
  id?: number;
  name: string;
  firstname: string;
  password: string;
  role?: Role;
}
export type Role = 'lecturer' | 'student';

export type StatusMessage = {
  message: string;
  type: string;
}