import { Ingredient } from '../model/ingredient';

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

type ProfileUpdateInput = {
    firstName: string;
    lastName: string;
    email: string;
};

type NewRecipeInput = {
    title: string;
    instructions: string;
    cookingTime: number;
    category: string;
    ingredients: {
        name: string;
        quantity: number;
        unit: string;
    };
};

type RecipeUpdateInput = {
    title?: string;
    instructions?: string;
    cookingTime?: number;
    category?: string;
    ingredients?: {
        ingredient: Ingredient;
        unit: string;
        quantity: number;
    }[];
    imageUrl?: string;
    isFavorite?: boolean;
    notes?: string;
    source?: string;
};

type RecipeCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'other';

type IngredientCategory =
    | 'Produce' // Combines Vegetables & Fruits
    | 'Meat & Fish' // Combines Meats & Seafood
    | 'Dairy & Eggs'
    | 'Pantry' // Combines Grain, Pasta, Canned, Baking, Spices, Oils
    | 'Snacks'
    | 'Beverages'
    | 'Frozen'
    | 'Other';

export {
    IngredientCategory,
    UserSignupInput,
    UserLoginInput,
    ProfileUpdateInput,
    NewRecipeInput,
    RecipeUpdateInput,
    RecipeCategory,
};
