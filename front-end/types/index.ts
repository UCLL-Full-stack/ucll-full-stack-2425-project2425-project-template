export type Admin = {
  name: string;
  role: string;
};

export type Crash = {
  type: string;
  description: string;
  casualties: number;
  deaths: number;
  id?: number;
};

export type Driver = {
  name: string;
  team: string;
  description: string;
  age: number;
  racecar: Racecar;
  crash: Crash;
  id?: number;
};

export type Gebruiker = {
  username: string;
  password: string;
  id?: number;
};

export type Race = {
  name: string;
  type: string;
  description: string;
  location: string;
  drivers?: Driver[];
  crashes?: Crash[];
  admin?: Admin;
  id?: number;
};

export type Racecar = {
  car_name: string;
  type: string;
  description: string;
  hp: number;
  id?: number;
};

export type Submission_form = {
  title: string;
  content: string;
  user: Gebruiker;
  race: Race;
  id?: number;
};

export type User = {
  firstName?: string;
  lastName?: string;
  fullname?: string;
  email?: string;
  username?: string;
  password?: string;
  role?: string;
};