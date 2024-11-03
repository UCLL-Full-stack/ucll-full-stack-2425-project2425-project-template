import { Role } from './Role';
import { Assignment } from './Assignment';
import { Progress } from './Progress';

export interface User {
  id: number;
  email: string;
  password: string;
  role: Role;
  assignments: Assignment[];
  progresses: Progress[];
  createdAt: Date;
  updatedAt: Date;
}