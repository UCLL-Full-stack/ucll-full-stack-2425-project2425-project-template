export type RecipeIngredient = {
    recipeingredientId?: number;
    recipeId: number;
    ingredientId: number;
    unit: string;
    quantity: number;
};

export type Recipe = {
    id?: number;
    ingredients: RecipeIngredient[];
    user: User;
    title: string;
    description: string;
    instructions: string;
    nutritionFacts: string,
    cookingTips: string,
    extraNotes: string,
    createdAt: Date,
    updatedAt: Date,
    tags: Tag[]
}

export type Role = 'admin' | 'user' | 'guest';

export type User = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}

export type Tag = {
    tagId?: number
    name: string
    description: string
}
