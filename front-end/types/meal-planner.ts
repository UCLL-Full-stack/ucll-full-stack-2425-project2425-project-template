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

type Meal = {
  id: string;
  name: string;
  ingredients: Ingredient[];
  date: Date;
};

export type { Ingredient, Meal };
export { IngredientCategory };
