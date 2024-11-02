export class Ingredient {
    ingredient_id: number;
    name: string;


    constructor(ingredient_id: number, name: string) {
        this.ingredient_id = ingredient_id;
        this.name = name;

    }

    getId(): number {
        return this.ingredient_id;
    }
    getName(): string {
        return this.name;
    }
    setName(name: string): void {
        this.name = name;
    }

    equals(other: Ingredient): boolean {
        return this.ingredient_id === other.ingredient_id &&
               this.name === other.name
    }
}
