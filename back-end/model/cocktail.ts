import { Ingredient } from "./ingredient";


export class Cocktail {
    private id: number;
    private name: string;
    private description: string;
    private strongness?: boolean;
    private ingriendentsList: Ingredient[];

    constructor(id: number, name: string, description: string, strongness?: boolean, ingriendentsList: Ingredient[] = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.strongness = strongness;
        this.ingriendentsList = ingriendentsList;
    }

    // Getters
    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getStrongness(): boolean | undefined {
        return this.strongness;
    }

    getIngredientsList(): Ingredient[] {
        return this.ingriendentsList;
    }

    // Method to add an ingredient by name
    addIngredientByName(name: string): void {
        this.ingriendentsList.push(new Ingredient(name));
    }

    // Method to remove an ingredient by name
    removeIngredientByName(name: string): void {
        this.ingriendentsList = this.ingriendentsList.filter(ingredient => ingredient.name !== name);
    }
}