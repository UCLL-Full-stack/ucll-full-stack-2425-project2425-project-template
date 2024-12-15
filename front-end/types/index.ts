export type User = {
  id: number;
  username: string;
  password: string;
  role: string;
};

export type Caretaker = {
  id: number;
  name: string;
  user: User;
};

export type Animal = {
  id: number;
  name: string;
  age: number;
  species: string;
  favouriteFood: string;
  favouritetoy: string;
  costPerMonth: number;
  costPerMonthPerSpecies: number;
  caretakers: Caretaker[];
};

export type Expense = {
  totalCost: number;
  month: string;
};