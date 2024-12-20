import {Cocktail as CocktailPrisma} from '@prisma/client';


export class Cocktail {
    private id?: number;
    private name: string;
    private description: string;
    private strongness: number;
    private image: string;
    private authorId?: number;

    constructor(cocktail: { id?: number; name: string; description: string; strongness: number; image: string, authorId?: number }) {
        
        this.validate(cocktail);

        this.id = cocktail.id;
        this.name = cocktail.name;
        this.description = cocktail.description;
        this.strongness = cocktail.strongness;
        this.image = cocktail.image;
        this.authorId = cocktail.authorId;
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

    getAuthorId(): number | undefined {
        return this.authorId;
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
validate(cocktail: {
    name: string;
    description: string;
    strongness: number;
    image: string;
    authorId?: number;
  }) {
    if (!cocktail.name?.trim()) {
      throw new Error('Name is required');
    }
    if (!cocktail.description?.trim()) {
      throw new Error('Description is required');
    }
    if (cocktail.strongness === undefined || cocktail.strongness === null) {
      throw new Error('Strongness is required');
    }
    if (!cocktail.image?.trim()) {
      throw new Error('Image is required');
    }
    if (cocktail.authorId === undefined || cocktail.authorId === null) {
      throw new Error('Author ID is required');
    }
  }
    static from({ id, name, description, strongness, image , authorId}: CocktailPrisma) {    
        return new Cocktail({id, name, description, strongness, image, authorId});
    }

}
