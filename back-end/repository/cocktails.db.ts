import { Cocktail } from "../model/cocktail";
import { Ingredient } from "../model/ingredient";

const ingredientsMojito = [
    new Ingredient(1, "White rum", "50ml"),
    new Ingredient(2, "Mint leaves", "10 leaves"),
    new Ingredient(3, "Lime", "1/2 lime"),
    new Ingredient(4, "Sugar", "2 tsp"),
    new Ingredient(5, "Soda water", "to top"),
    new Ingredient(6, "Ice", "as needed"),
];

const ingredientsMoscowMule = [
    new Ingredient(7, "Vodka", "60ml"),
    new Ingredient(8, "Ginger beer", "120ml"),
    new Ingredient(9, "Lime juice", "15ml"),
    new Ingredient(6, "Ice", "as needed"),
    new Ingredient(10, "Lime wedge", "1 wedge"),
];

const ingredientsAmarettoSour = [
    new Ingredient(11, "Amaretto liqueur", "45ml"),
    new Ingredient(12, "Lemon juice", "30ml"),
    new Ingredient(13, "Simple syrup", "10ml"),
    new Ingredient(14, "Egg white", "1 (optional)"),
    new Ingredient(6, "Ice", "as needed"),
    new Ingredient(15, "Cherry", "1 (for garnish)"),
];

const ingredientsPornstarMartini = [
    new Ingredient(16, "Vanilla vodka", "45ml"),
    new Ingredient(17, "Passion fruit puree", "30ml"),
    new Ingredient(12, "Lime juice", "15ml"),
    new Ingredient(18, "Prosecco", "served on the side"),
    new Ingredient(6, "Ice", "as needed"),
    new Ingredient(19, "Half passion fruit", "1/2 (for garnish)"),
];

const ingredientsCaipirinha = [
    new Ingredient(20, "Cachaça", "50ml"),
    new Ingredient(3, "Lime", "1 (whole)"),
    new Ingredient(4, "Sugar", "2 tsp"),
    new Ingredient(6, "Ice", "as needed"),
];



const cocktailsList = [
    new Cocktail(
        1,
        "Mojito",
        "A refreshing Cuban cocktail with lime, mint, and rum.",
        3,
        ingredientsMojito
    ),
    new Cocktail(
        2,
        "Moscow Mule",
        "A refreshing cocktail made with vodka, ginger beer, and lime, served in a copper mug.",
        3,
        ingredientsMoscowMule
    ),
    new Cocktail(
        3,
        "Amaretto Sour",
        "A sweet and sour cocktail made with Amaretto liqueur and lemon juice.",
        2,
        ingredientsAmarettoSour
    ),
    new Cocktail(
        4,
        "Pornstar Martini",
        "A fruity and exotic cocktail with passion fruit and vanilla vodka.",
        4,
        ingredientsPornstarMartini
    ),
    new Cocktail(
        5,
        "Caipirinha",
        "A Brazilian cocktail made with cachaça, lime, and sugar.",
        4,
        ingredientsCaipirinha
    )
];

const getAllCocktails = (): Cocktail[] => cocktailsList;

const getCocktailById = ({ id }: { id: number }): Cocktail | null => {
    return cocktailsList.find((cocktail) => cocktail.getId() === id) || null;
};

const getCocktailByName = ({ name }: { name: string }): Cocktail | null => {
    return cocktailsList.find((cocktail) => cocktail.getName() === name) || null;
}

export default { getAllCocktails, getCocktailById, getCocktailByName };