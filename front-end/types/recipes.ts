import { IngredientCategory } from "./meal-planner";

export type Ingredient = {
  id: number;
  name: string;
  category: IngredientCategory;
};

export type RecipeIngredient = {
  ingredient: Ingredient;
  unit: string;
  quantity: number;
};

export type Recipe = {
  id: number;
  title: string;
  instructions: string;
  cookingTime: number;
  category: RecipeCategory;
  ingredients: RecipeIngredient[];
  user: {
    id: number;
    username: string;
  };
  imageUrl: string;
  isFavorite: boolean;
  notes?: string;
  source?: string;
};

type RecipeCategory = "breakfast" | "lunch" | "dinner" | "snack" | "other";
