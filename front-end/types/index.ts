export type Cocktail = {
    id: number;
    name: string;
    description: string;
    strongness: number;
    image: string;
}

export type Ingredient = {
    _id: number;          
    _cocktailId: number;   
    _ingredientId: number;
    _amount: string;       
}

export type CocktailIngredient = {
    _ingredientId: number;
    _amount: string;
};