type Role = 'admin' | 'caretaker' | 'visitor';

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
    species: string;
    favouriteFood: string;
    favouritetoy: string;
    costPerMonth: number;
    costPerMonthPerSpecies: number;
    caretakers: number[]; // Array of caretaker IDs
}

interface CaretakerInput {
    id?: number;
    user: UserInput;
    name: string;
}

export { Role, UserInput, AnimalInput, CaretakerInput };
