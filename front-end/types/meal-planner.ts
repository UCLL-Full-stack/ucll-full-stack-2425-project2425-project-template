enum IngredientCategory {
  Produce = "Produce",
  MeatAndFish = "Meat & Fish",
  DairyAndEggs = "Dairy & Eggs",
  Pantry = "Pantry",
  Snacks = "Snacks",
  Beverages = "Beverages",
  Frozen = "Frozen",
  Other = "Other",
}

type Ingredient = {
  id?: number;
  name: string;
  category: IngredientCategory;
  quantity: number;
  unit: string;
  store?: string;
};

type MealDay = {
  id: string;
  title: string;
  category: MealCategory;
  description: string;
  imageUrl: string;
  isFavorite: boolean;
  instructions?: string;
  cookingTime?: number;
  ingredients?: Ingredient[];
  notes?: string;
  source?: string;
};

type MealCategory = "breakfast" | "lunch" | "dinner" | "snack" | "other";

export type { Ingredient, MealDay, MealCategory };
export { IngredientCategory };
