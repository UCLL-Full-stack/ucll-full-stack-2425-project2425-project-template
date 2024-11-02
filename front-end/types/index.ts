export type Ingredient = {
    id: number;
    name: string;
    amount: string;
}

export type Cocktail = {
    id: number;
    name: string;
    description: string;
    strongness: number;
    ingredientsList: Ingredient[];
}