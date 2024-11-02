export class Ingredient {
    readonly id?: number;
    readonly name: string;
    readonly category: string;

    constructor(name: string, category: string) {
        this.name = name;
        this.category = category;
    }

    equals(ingredient: Ingredient): boolean {
        return this.name === ingredient.name && this.category === ingredient.category;
    }
}

export default { Ingredient };