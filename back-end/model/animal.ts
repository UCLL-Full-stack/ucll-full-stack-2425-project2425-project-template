import { Caretaker } from './caretaker';
import { Expense } from './expense';
import { Species } from './species';
import {
    Animal as AnimalPrisma,
    Expense as ExpensePrisma,
    Species as SpeciesPrisma,
    Caretaker as CaretakerPrisma,
    User as UserPrisma,
} from '@prisma/client';

export class Animal {
    private id?: number;
    private name: string;
    private age: number;
    private species: Species;
    private favouriteFood: string;
    private favouritetToy: string;
    private expenses: Expense[];
    private caretaker: Caretaker;

    constructor(animal: {
        id?: number;
        name: string;
        age: number;
        species: Species;
        favouriteFood: string;
        favouriteToy: string;
        expenses: Expense[];
        caretaker: Caretaker;
    }) {
        this.validate(animal);

        this.id = animal.id;
        this.name = animal.name;
        this.age = animal.age;
        this.species = animal.species;
        this.favouriteFood = animal.favouriteFood;
        this.favouritetToy = animal.favouriteToy;
        this.expenses = animal.expenses;
        this.caretaker = animal.caretaker;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getAge(): number {
        return this.age;
    }

    getSpecies(): Species {
        return this.species;
    }

    getFavouriteFood(): string {
        return this.favouriteFood;
    }

    getFavouriteToy(): string {
        return this.favouritetToy;
    }

    getExpenses(): Expense[] {
        return this.expenses;
    }

    getCaretakers(): Caretaker {
        return this.caretaker;
    }

    validate(animal: {
        name: string;
        age: number;
        species: Species;
        favouriteFood: string;
        favouriteToy: string;
        expenses: Expense[];
        caretaker: Caretaker;
    }) {
        if (!animal.name?.trim()) {
            throw new Error('Name is required and cannot be empty.');
        }
        if (animal.age < 0) {
            throw new Error('Age must be a non-negative number.');
        }
        if (!animal.species) {
            throw new Error('Species must exist!');
        }
        if (!animal.favouriteFood?.trim()) {
            throw new Error('Favourite food is required and cannot be empty.');
        }
        if (!animal.favouriteToy?.trim()) {
            throw new Error('Favourite toy is required and cannot be empty.');
        }
        if (!animal.expenses) {
            throw new Error('Expenses is required.');
        }
    }

    static from({
        id,
        name,
        age,
        species,
        favouriteFood,
        favouriteToy,
        expenses,
        caretaker,
    }: AnimalPrisma & {
        species: SpeciesPrisma;
        expenses: ExpensePrisma[];
        caretaker: CaretakerPrisma & { user: UserPrisma };
    }) {
        return new Animal({
            id,
            name,
            age,
            species: Species.from(species),
            favouriteFood,
            favouriteToy,
            expenses: expenses.map((expense) => Expense.from(expense)),
            caretaker: Caretaker.from(caretaker),
        });
    }

    equals(animal: Animal): boolean {
        return (
            this.name === animal.getName() &&
            this.age === animal.getAge() &&
            this.species === animal.getSpecies() &&
            this.favouriteFood === animal.getFavouriteFood() &&
            this.favouritetToy === animal.getFavouriteToy()
        );
    }
}
