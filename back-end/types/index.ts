import { Ingredient } from '../model/ingredient';

type Role = 'admin' | 'user' | 'guest';

type UserSignupInput = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
};

type UserLoginInput = {
    username: string;
    password: string;
};

type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: string;
};

type ProfileUpdateInput = {
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
};

type NewRecipeInput = {
    title: string;
    instructions: string;
    cookingTime: number;
    category: string;
    ingredients: {
        id: number;
        name: string;
        category: IngredientCategory;
        quantity: number;
        unit: string;
    }[];
};

type RecipeUpdateInput = {
    title: string;
    instructions: string;
    cookingTime: number;
    category: RecipeCategory;
    ingredients: {
        ingredient: Ingredient;
        unit: string;
        quantity: number;
    }[];
    imageUrl?: string;
    isFavorite?: boolean;
    notes?: string;
    source?: string;
    scheduledDate?: Date;
};

type RecipeCategory = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK' | 'OTHER';

type IngredientCategory =
    | 'PRODUCE' // Combines Vegetables & Fruits
    | 'MEAT_FISH' // Combines Meats & Seafood
    | 'DAIRY_EGGS'
    | 'PANTRY' // Combines Grain, Pasta, Canned, Baking, Spices, Oils
    | 'SNACKS'
    | 'BEVERAGES'
    | 'FROZEN'
    | 'OTHER';

export {
    IngredientCategory,
    UserSignupInput,
    UserLoginInput,
    ProfileUpdateInput,
    NewRecipeInput,
    RecipeUpdateInput,
    RecipeCategory,
    AuthenticationResponse,
    Role,
};
