import { Ingredient } from "../model/ingredient";

let currentId = 1   ;

const ingredientList = [
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
    new Ingredient(currentId++, "Vanilla vodka"),
    new Ingredient(currentId++, "Passion fruit puree"),
    new Ingredient(currentId++, "Lime juice"),
    new Ingredient(currentId++, "Prosecco"),
    new Ingredient(currentId++, "Ice"),
    new Ingredient(currentId++, "Half passion fruit"),
    new Ingredient(currentId++, "Cachaça"),
    new Ingredient(currentId++, "Lime"),
    new Ingredient(currentId++, "Sugar"),
    new Ingredient(currentId++, "Ice"),
    new Ingredient(currentId++, "Gin"),
    new Ingredient(currentId++, "Vodka"),
    new Ingredient(currentId++, "Lillet Blanc"),
    new Ingredient(currentId++, "Lemon twist"),
    new Ingredient(currentId++, "Vodka"),
    new Ingredient(currentId++, "Dry vermouth"),
    new Ingredient(currentId++, "Olive"),
    new Ingredient(currentId++, "Vodka"),
    new Ingredient(currentId++, "Triple sec"),
    new Ingredient(currentId++, "Cranberry juice"),
    new Ingredient(currentId++, "Lime juice"),
    new Ingredient(currentId++, "Coffee liqueur"),
    new Ingredient(currentId++, "Espresso"),
    new Ingredient(currentId++, "Gin"),
    new Ingredient(currentId++, "Lemon juice"),
    new Ingredient(currentId++, "Simple syrup"),
    new Ingredient(currentId++, "Basil leaves"),
    new Ingredient(currentId++, "White rum"),
    new Ingredient(currentId++, "Coconut cream"),
    new Ingredient(currentId++, "Pineapple juice"),
    new Ingredient(currentId++, "Ice"),
    new Ingredient(currentId++, "Tequila"),
    new Ingredient(currentId++, "Triple sec"),
    new Ingredient(currentId++, "Lime juice"),
    new Ingredient(currentId++, "Salt"),
    new Ingredient(currentId++, "Dark rum"),
    new Ingredient(currentId++, "White rum"),
    new Ingredient(currentId++, "Apricot brandy"),
    new Ingredient(currentId++, "Pineapple juice"),
    new Ingredient(currentId++, "Lime juice"),
    new Ingredient(currentId++, "Dark rum"),
    new Ingredient(currentId++, "White rum"),
    new Ingredient(currentId++, "Orange curaçao"),
    new Ingredient(currentId++, "Lime juice"),
    new Ingredient(currentId++, "Campari"),
    new Ingredient(currentId++, "Sweet vermouth"),
    new Ingredient(currentId++, "Soda water"),
    new Ingredient(currentId++, "Vodka"),
    new Ingredient(currentId++, "Tomato juice"),
    new Ingredient(currentId++, "Lemon juice"),
    new Ingredient(currentId++, "Worcestershire sauce"),
    new Ingredient(currentId++, "Tabasco"),
    new Ingredient(currentId++, "Salt and pepper"),
    new Ingredient(currentId++, "Rye whiskey"),
    new Ingredient(currentId++, "Sweet vermouth"),
    new Ingredient(currentId++, "Angostura bitters"),
    new Ingredient(currentId++, "Blended scotch"),
    new Ingredient(currentId++, "Honey-ginger syrup"),
    new Ingredient(currentId++, "Lemon juice"),
    new Ingredient(currentId++, "Islay scotch"),
    new Ingredient(currentId++, "Aperol"),
    new Ingredient(currentId++, "Prosecco"),
    new Ingredient(currentId++, "Soda water"),
    new Ingredient(currentId++, "Gin"),
    new Ingredient(currentId++, "Dry vermouth"),
    new Ingredient(currentId++, "Olive"),
    new Ingredient(currentId++, "Whiskey"),
    new Ingredient(currentId++, "Lemon juice"),
    new Ingredient(currentId++, "Simple syrup"),
    new Ingredient(currentId++, "White rum"),
    new Ingredient(currentId++, "Lime juice"),
    new Ingredient(currentId++, "Simple syrup"),
    new Ingredient(currentId++, "Vodka"),
    new Ingredient(currentId++, "Espresso"),
    new Ingredient(currentId++, "Coffee liqueur"),
    new Ingredient(currentId++, "Bourbon or rye whiskey"),
    new Ingredient(currentId++, "Sugar cube"),
    new Ingredient(currentId++, "Angostura bitters"),
    new Ingredient(currentId++, "Gin"),
    new Ingredient(currentId++, "Campari"),
    new Ingredient(currentId++, "Sweet vermouth")
];


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