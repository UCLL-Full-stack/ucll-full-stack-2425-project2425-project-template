import { Recipe } from '../types/recipes';

export type RegisterData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
}

export type UserTable = {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}