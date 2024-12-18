import { CocktailIngredient as CocktailIngredientPrisma} from "@prisma/client";

export class CocktailIngredient {
    private id?: number;
    private cocktailId!: number;
    private ingredientId!: number;
    private amount!: string;

    constructor(id: number, cocktailId: number, ingredientId: number, amount: string) {
        this.id = id;
        this.cocktailId = cocktailId;
        this.ingredientId = ingredientId;
        this.amount = amount;
    }

    public getId(): number | undefined {
        return this.id;
    }
    public getCocktailId(): number {
        return this.cocktailId;
    }
    public getIngredientId(): number {
        return this.ingredientId;
    }
    public getAmount(): string {
        return this.amount;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setCocktailId(cocktailId: number): void {
        this.cocktailId = cocktailId;
    }

    public setIngredientId(ingredientId: number): void {
        this.ingredientId = ingredientId;
    }

    public setAmount(amount: string): void {
        this.amount = amount;
    }

    static from({ id, cocktailId, ingredientId, amount }: CocktailIngredientPrisma) {
        return new CocktailIngredient(id, cocktailId, ingredientId, amount);
    }

}