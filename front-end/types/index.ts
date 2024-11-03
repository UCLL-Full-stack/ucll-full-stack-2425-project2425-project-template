export type Cocktail = {
    id: number;
    name: string;
    description: string;
    strongness: number;
    image: string;
}

export type Ingredient = {
    id: number;          
    cocktailId: number;   
    ingredientId: number;
    amount: string;       
}

export type CocktailIngredient = {
    ingredientId: number;
    amount: string;
};