export type Recipe = {
    recipeId?: number;
    user: User;
    title: string;
    description: string;
    instructions: string;
    nutritionFacts: string;
    cookingTips: string;
    extraNotes: string;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
}

type Role = 'admin' | 'user' | 'guest';

export type Tag = {
    tagId?: number;
    name: string;
    description: string;
    recipes: Recipe[];
}

export type User = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    role: Role;
}