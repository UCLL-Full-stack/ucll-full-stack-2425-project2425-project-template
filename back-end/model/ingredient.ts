export class Ingredient {
    ingredient_id: number;
    name: string;
    amount: string;

    constructor(ingredient_id: number, name: string, amount: string) {
        this.ingredient_id = ingredient_id;
        this.name = name;
        this.amount = amount;
    }

    getId(): number {
        return this.ingredient_id;
    }
    getName(): string {
        return this.name;
    }
    getAmount(): string {
        return this.amount;
    }
    setName(name: string): void {
        this.name = name;
    }
    setAmount(amount: string): void {
        this.amount = amount;
    }
    equals(other: Ingredient): boolean {
        return this.ingredient_id === other.ingredient_id &&
               this.name === other.name &&
               this.amount === other.amount;
    }
}
