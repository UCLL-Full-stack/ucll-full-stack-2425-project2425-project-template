export class Recipe {
    private id?: number;
    private title: string;
    private instructions: string;
    private cookingTime: number;
    private category: string; // flexible for custom categories

    constructor(recipe: {
        id?: number;
        title: string;
        instructions: string;
        cookingTime: number;
        category: string;
    }) {
        this.id = recipe.id;
        this.title = recipe.title;
        this.instructions = recipe.instructions;
        this.cookingTime = recipe.cookingTime;
        this.category = recipe.category;
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getInstructions(): string {
        return this.instructions;
    }

    getCookingTime(): number {
        return this.cookingTime;
    }

    getCategory(): string {
        return this.category;
    }

    equals(recipe: Recipe): boolean {
        return (
            this.title === recipe.getTitle() &&
            this.instructions === recipe.getInstructions() &&
            this.cookingTime === recipe.getCookingTime() &&
            this.category === recipe.getCategory()
        );
    }
}
