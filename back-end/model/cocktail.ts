import { Ingredient } from "./ingredient";


export class Cocktail {
    private id: number;
    private name: string;
    private description: string;
    private strongness: number;
    private image: string;

    constructor(id: number, name: string, description: string, strongness: number, image: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.strongness = strongness;
        this.image = image;
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

  
    getDescription(): string {
        return this.description;
    }

    getStrongness(): number {
        return this.strongness;
    }

    getImage(): string {
        return this.image;
    }


    equals(cocktail: Cocktail): boolean {
    return (
        this.id === cocktail.getId() &&
        this.name === cocktail.getName() &&
        this.description === cocktail.getDescription() &&
        this.strongness === cocktail.getStrongness()
    );
}
}