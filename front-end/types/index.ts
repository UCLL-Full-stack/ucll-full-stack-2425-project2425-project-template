export type Admin = {
  id?: number;
  username: string;
  password: string;
};

export type Crash = {
  id?: number;
  type: string;
  description: string;
  casualties: number;
  deaths: number;
  participants?: Participant[];
};

export type Driver = {
  id?: number;
  name: string;
  surname: string;
  birthdate: Date;
  team: string;
  country: string;
  description: string;
};

export type Gebruiker = {
  id?: number;
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  permission: Permission;
  createdAt: Date;
  submissions?: Submission_form[];
};

export type Participant = {
  id?: number;
  driver: Driver;
  racecar: Racecar;
};

export type Race = {
  id?: number;
  name: string;
  type: string;
  description: string;
  location: string;
  date: Date;
  crashes?: Crash[];
};

export type Racecar = {
  id?: number;
  name: string;
  type: string;
  brand: string;
  hp: number;
};

export type Submission_form = {
  id?: number;
  title: string;
  content: string;
  type: string;
  createdAt: Date;
  solvedAt?: Date;
  user: Gebruiker;
  race: Race;
};

export type Permission = 'ADMIN' | 'USER' | 'GUEST';

export type User = {
  firstName?: string;
  lastName?: string;
  fullname?: string;
  email?: string;
  username?: string;
  password?: string;
  permission?: string;
};

export type StatusMessage = {
  message: string;
  type: "error" | "success";
};