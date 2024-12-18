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
  species: Species;
  favouriteFood: string;
  favouriteToy: string;
  expenses: Expense[]
  caretaker: Caretaker;
};

export type Expense = {
  id: number;
  totalCost: number;
  month: string;
};

export type Species = {
  id: number;
  species: string;
}

export type StatusMessage = {
  message: string;
  type: "error" | "success";
}