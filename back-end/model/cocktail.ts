import {Cocktail as CocktailPrisma} from '@prisma/client';


export class Cocktail {
    private id?: number;
    private name: string;
    private description: string;
    private strongness: number;
    private image: string;

    constructor(cocktail: { id?: number; name: string; description: string; strongness: number; image: string}) {
        this.id = cocktail.id;
        this.name = cocktail.name;
        this.description = cocktail.description;
        this.strongness = cocktail.strongness;
        this.image = cocktail.image;
    }

    // Getters
    getId(): number | undefined{
        return this.id;
    }

    getName(): string {
        return this.name;
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

    setName(name: string): void {
        this.name = name;
    }

    setStrongness(strongness: number): void {
        this.strongness = strongness;
    }
    setDescription(description: string): void {
        this.description = description
    }

    equals(cocktail: Cocktail): boolean {
    return (
        this.id === cocktail.getId() &&
        this.name === cocktail.getName() &&
        this.description === cocktail.getDescription() &&
        this.strongness === cocktail.getStrongness()
    );
}
    static from({ id, name, description, strongness, image }: CocktailPrisma) {    
        return new Cocktail({id, name, description, strongness, image});
    }

}