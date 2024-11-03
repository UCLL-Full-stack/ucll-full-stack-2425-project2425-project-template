import { Ingredient } from "../model/ingredient";

let currentId = 1   ;

const ingredientList = 
[
    new Ingredient(currentId++, "White rum"),
    new Ingredient(currentId++, "Mint leaves"),
    new Ingredient(currentId++, "Lime"),
    new Ingredient(currentId++, "Sugar"),
    new Ingredient(currentId++, "Soda water"),
    new Ingredient(currentId++, "Ice"),
    new Ingredient(currentId++, "Vodka"),
    new Ingredient(currentId++, "Ginger beer"),
    new Ingredient(currentId++, "Lime juice"),
    new Ingredient(currentId++, "Ice"),
    new Ingredient(currentId++, "Lime wedge"),
    new Ingredient(currentId++, "Amaretto liqueur"),
    new Ingredient(currentId++, "Lemon juice"),
    new Ingredient(currentId++, "Simple syrup"),
    new Ingredient(currentId++, "Egg white"),
    new Ingredient(currentId++, "Cherry"),
]

const getAllIngredients = (): Ingredient[] => ingredientList;

const getIngredientById = ({ id }: { id: number }): Ingredient | null => {
    return ingredientList.find((cocktail) => cocktail.getId() === id) || null;
};

const getIngredientByName = ({ name }: { name: string }): Ingredient | null => {
    return ingredientList.find((cocktail) => cocktail.getName() === name) || null;
}

const addIngredient = ({ name }: { name: string }): Ingredient => {
    const newIngredient = new Ingredient(currentId++, name);
    ingredientList.push(newIngredient);
    return newIngredient;
};

export default { getAllIngredients, getIngredientById, getIngredientByName, addIngredient };