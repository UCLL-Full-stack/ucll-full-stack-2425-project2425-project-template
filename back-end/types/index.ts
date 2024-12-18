import { Caretaker } from "../model/caretaker";
import { Expense } from "../model/expense";
import { Species } from "../model/species";

type Role = 'admin' | 'caretaker' | 'manager';

interface UserInput {
    id?: number;
    username: string;
    password: string;
    role: Role;
}

interface AnimalInput {
    id?: number;
    name: string;
    age: number;
    speciesId: number;
    favouriteFood: string;
    favouriteToy: string;
    firstExpense: number;
    caretakerId: number;
}

interface CaretakerInput {
    id?: number;
    user: UserInput;
    name: string;
}

interface ManagerInput {
    id?: number;
    user: UserInput;
    name: string;
}

type AuthenticationResponse = {
    token: string;
    username: string;
    role: string;
};

export { Role, UserInput, AnimalInput, CaretakerInput, ManagerInput, AuthenticationResponse };
