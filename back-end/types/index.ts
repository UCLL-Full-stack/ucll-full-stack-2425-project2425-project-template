import { User } from "../model/user";

type Role = 'admin' | 'user' | 'guest';

type RecipeInput = {
    id?: number;
    user: User;
    title: string;
    description: string;
    instructions: string;
}

export { Role, RecipeInput };