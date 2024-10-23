export class Ingredient {
    ingredient_id: number;
    name: string;
    amount: number;

    constructor(ingredient_id: number, name: string, amount: number) {
        this.ingredient_id = ingredient_id;
        this.name = name;
        this.amount = amount;
    }
}
