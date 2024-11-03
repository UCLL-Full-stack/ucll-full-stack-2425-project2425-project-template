import { User } from "../model/user";

type RecipeIngredientInput = {
    recipeingredientId?: number;
    recipeId: number;
    ingredientId: number;
    unit: string;
    quantity: number;
};

type RecipeInput = {
    id?: number;
    ingredients: RecipeIngredientInput[];
    user: User;
    title: string;
    description: string;
    instructions: string;
}

type Role = 'admin' | 'user' | 'guest';

type UserInput = {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
}


export { RecipeIngredientInput, Role, RecipeInput, UserInput };