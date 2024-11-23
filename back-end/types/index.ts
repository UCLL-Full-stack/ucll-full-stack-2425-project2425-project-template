import { RecipeIngredient } from '@prisma/client';

type IngredientInput = {
    id?: number;
    name: string;
    category: string;
};

type RecipeInput = {
    id?: number;
    name: string;
    description: string;
    ingredients: RecipeIngredient[];
    creator: UserInput;
    reviews: ReviewInput[];
};

type ReviewInput = {
    id?: number;
    writer: UserInput;
    text: string;
    score: number;
    recipe: RecipeInput;
};

type UserInput = {
    id?: number;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    recipes?: RecipeInput[];
    reviews?: ReviewInput[];
};

// Exporting all types
export { UserInput, RecipeInput, ReviewInput, IngredientInput };
