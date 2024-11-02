import { Caretaker } from './caretaker';

export class Animal {
    private id?: number;
    private name: string;
    private age: number;
    private species: string;
    private favouriteFood: string;
    private favouritetoy: string;
    private costPerMonth: number;
    private costPerMonthPerSpecies: number;
    private caretakers: Caretaker[];

    constructor(animal: {
        id?: number;
        name: string;
        age: number;
        species: string;
        favouriteFood: string;
        favouritetoy: string;
        costPerMonth: number;
        costPerMonthPerSpecies: number;
        caretakers?: Caretaker[];
    }) {
        if (!animal.name || animal.name.trim() === "") {
            throw new Error("Name is required and cannot be empty.");
        }
        if (animal.age < 0) {
            throw new Error("Age must be a non-negative number.");
        }
        if (!animal.species || animal.species.trim() === "") {
            throw new Error("Species is required and cannot be empty.");
        }
        if (!animal.favouriteFood || animal.favouriteFood.trim() === "") {
            throw new Error("Favourite food is required and cannot be empty.");
        }
        if (!animal.favouritetoy || animal.favouritetoy.trim() === "") {
            throw new Error("Favourite toy is required and cannot be empty.");
        }
        if (animal.costPerMonth < 0) {
            throw new Error("Cost per month must be a non-negative number.");
        }
        if (animal.costPerMonthPerSpecies < 0) {
            throw new Error("Cost per month per species must be a non-negative number.");
        }
        
        this.id = animal.id;
        this.name = animal.name;
        this.age = animal.age;
        this.species = animal.species;
        this.favouriteFood = animal.favouriteFood;
        this.favouritetoy = animal.favouritetoy;
        this.costPerMonth = animal.costPerMonth;
        this.costPerMonthPerSpecies = animal.costPerMonthPerSpecies;
        this.caretakers = animal.caretakers || []; 
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

    getSpecies(): string {
        return this.species;
    }

    getFavouriteFood(): string {
        return this.favouriteFood;
    }

    getFavouriteToy(): string {
        return this.favouritetoy;
    }

    getCostPerMonth(): number {
        return this.costPerMonth;
    }

    getCostPerMonthPerSpecies(): number {
        return this.costPerMonthPerSpecies;
    }
    
    getCaretakers(): Caretaker[] {
        return this.caretakers;
    }

    addCaretaker(caretaker: Caretaker): void {
        if (!this.caretakers.includes(caretaker)) {
            this.caretakers.push(caretaker);
            caretaker.addAnimal(this); 
        }
    }

    equals(animal: Animal): boolean {
        return (
            this.name === animal.getName() &&
            this.age === animal.getAge() &&
            this.species === animal.getSpecies() &&
            this.favouriteFood === animal.getFavouriteFood() &&
            this.favouritetoy === animal.getFavouriteToy()
        );
    }
}
