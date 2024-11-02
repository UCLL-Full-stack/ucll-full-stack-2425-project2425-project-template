import { Ingredient } from "./ingredient";


export class Cocktail {
    private id: number;
    private name: string;
    private description: string;
    private strongness: number;
    private ingredientsList: Ingredient[];

    constructor(id: number, name: string, description: string, strongness: number, ingredientsList: Ingredient[] = []) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.strongness = strongness;
        this.ingredientsList = ingredientsList;
    }

    // Getters
    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
    setName(name: string): void {
        this.name = name;
    }

    setStrongness(strongness: number): void {
        this.strongness = strongness;
    }
    setDescription(description: string): void {
        this.description = description
    }

    setIngredientsList(ingredientsList: Ingredient[]): void {
        this.ingredientsList = ingredientsList;
    }
  

    getDescription(): string {
        return this.description;
    }

    getStrongness(): number {
        return this.strongness;
    }

    getIngredientsList(): Ingredient[] {
        return this.ingredientsList;
    }

    // Method to add an ingredient by name
    addIngredientByName(name: string): void {
        this.ingredientsList.push();
    }

    // Method to remove an ingredient by name
    removeIngredientByName(name: string): void {
        this.ingredientsList = this.ingredientsList.filter(ingredient => ingredient.name !== name);
    }


    equals(cocktail: Cocktail): boolean {
    return (
        this.id === cocktail.getId() &&
        this.name === cocktail.getName() &&
        this.description === cocktail.getDescription() &&
        this.strongness === cocktail.getStrongness() &&
        this.ingredientsList.length === cocktail.getIngredientsList().length &&
        this.ingredientsList.every((ingredient, index) => ingredient.equals(cocktail.getIngredientsList()[index]))
    );
}
}