import { CocktailIngredient } from "../model/cocktailIngredients";
import { Cocktail } from "../model/cocktail";
import { Ingredient } from "../model/ingredient";

let currentId = 1;

const cocktailIngredientsList = [
    // mojito
    new CocktailIngredient(currentId++, 1, 1, "50ml"),
    new CocktailIngredient(currentId++, 1, 2, "10 leaves"),
    new CocktailIngredient(currentId++, 1, 3, "1/2 lime"),
    new CocktailIngredient(currentId++, 1, 4, "2 tsp"),
    new CocktailIngredient(currentId++, 1, 5, "Top off"),
    new CocktailIngredient(currentId++, 1, 6, "As needed"),

    // Moscow Mule
    new CocktailIngredient(currentId++, 2, 7, "60ml"),
    new CocktailIngredient(currentId++, 2, 8, "120ml"),
    new CocktailIngredient(currentId++, 2, 9, "15ml"),
    new CocktailIngredient(currentId++, 2, 6, "As needed"),
    new CocktailIngredient(currentId++, 2, 10, "1 wedge"),

    //Amaretto Sour
    new CocktailIngredient(currentId++, 3, 11, "45ml"),
    new CocktailIngredient(currentId++, 3, 12, "30ml"),
    new CocktailIngredient(currentId++, 3, 13, "10ml"),
    new CocktailIngredient(currentId++, 3, 14, "(1 optional)"),
    new CocktailIngredient(currentId++, 3, 6, "As needed"),
    new CocktailIngredient(currentId++, 3, 15, "For garnish"),

];

export const getIngredientsByCocktailId = (cocktailId: number): CocktailIngredient[] => {
    return cocktailIngredientsList.filter(item => item.cocktailId === cocktailId);
};





export default {getIngredientsByCocktailId};