import { CocktailIngredient } from "../model/cocktailIngredients";
import { Cocktail } from "../model/cocktail";
import { Ingredient } from "../model/ingredient";

let currentId = 1;

const cocktailIngredientsList = [
    // Mojito
    new CocktailIngredient(currentId++, 1, 1, "50ml"), // White rum
    new CocktailIngredient(currentId++, 1, 2, "10 leaves"), // Mint leaves
    new CocktailIngredient(currentId++, 1, 3, "1/2 lime"), // Lime
    new CocktailIngredient(currentId++, 1, 4, "2 tsp"), // Sugar
    new CocktailIngredient(currentId++, 1, 5, "Top off"), // Soda water
    new CocktailIngredient(currentId++, 1, 6, "As needed"), // Ice

    // Moscow Mule
    new CocktailIngredient(currentId++, 2, 7, "60ml"), // Vodka
    new CocktailIngredient(currentId++, 2, 8, "120ml"), // Ginger beer
    new CocktailIngredient(currentId++, 2, 9, "15ml"), // Lime juice
    new CocktailIngredient(currentId++, 2, 6, "As needed"), // Ice
    new CocktailIngredient(currentId++, 2, 10, "1 wedge"), // Lime wedge

    // Amaretto Sour
    new CocktailIngredient(currentId++, 3, 11, "45ml"), // Amaretto liqueur
    new CocktailIngredient(currentId++, 3, 12, "30ml"), // Lemon juice
    new CocktailIngredient(currentId++, 3, 13, "10ml"), // Simple syrup
    new CocktailIngredient(currentId++, 3, 14, "(1 optional)"), // Egg white
    new CocktailIngredient(currentId++, 3, 6, "As needed"), // Ice
    new CocktailIngredient(currentId++, 3, 15, "For garnish"), // Cherry

    // Pornstar Martini
    new CocktailIngredient(currentId++, 4, 16, "45ml"), // Vanilla vodka
    new CocktailIngredient(currentId++, 4, 17, "30ml"), // Passion fruit puree
    new CocktailIngredient(currentId++, 4, 12, "15ml"), // Lime juice
    new CocktailIngredient(currentId++, 4, 18, "Served on the side"), // Prosecco
    new CocktailIngredient(currentId++, 4, 6, "As needed"), // Ice
    new CocktailIngredient(currentId++, 4, 19, "1/2 for garnish"), // Half passion fruit

    // Caipirinha
    new CocktailIngredient(currentId++, 5, 20, "50ml"), // Cachaça
    new CocktailIngredient(currentId++, 5, 3, "1 whole"), // Lime
    new CocktailIngredient(currentId++, 5, 4, "2 tsp"), // Sugar
    new CocktailIngredient(currentId++, 5, 6, "As needed"), // Ice

    // Vesper
    new CocktailIngredient(currentId++, 6, 21, "60ml"), // Gin
    new CocktailIngredient(currentId++, 6, 22, "15ml"), // Vodka
    new CocktailIngredient(currentId++, 6, 23, "7.5ml"), // Lillet Blanc
    new CocktailIngredient(currentId++, 6, 24, "1 for garnish"), // Lemon twist

    // Vodka Martini
    new CocktailIngredient(currentId++, 7, 25, "60ml"), // Vodka
    new CocktailIngredient(currentId++, 7, 26, "15ml"), // Dry vermouth
    new CocktailIngredient(currentId++, 7, 27, "1 for garnish"), // Olive

    // Cosmopolitan
    new CocktailIngredient(currentId++, 8, 28, "45ml"), // Vodka
    new CocktailIngredient(currentId++, 8, 29, "15ml"), // Triple sec
    new CocktailIngredient(currentId++, 8, 30, "30ml"), // Cranberry juice
    new CocktailIngredient(currentId++, 8, 31, "10ml"), // Lime juice

    // Carajillo
    new CocktailIngredient(currentId++, 9, 32, "45ml"), // Coffee liqueur
    new CocktailIngredient(currentId++, 9, 33, "30ml"), // Espresso

    // Gin Basil Smash
    new CocktailIngredient(currentId++, 10, 34, "50ml"), // Gin
    new CocktailIngredient(currentId++, 10, 35, "25ml"), // Lemon juice
    new CocktailIngredient(currentId++, 10, 36, "15ml"), // Simple syrup
    new CocktailIngredient(currentId++, 10, 37, "10 leaves"), // Basil leaves

    // Pina Colada
    new CocktailIngredient(currentId++, 11, 38, "45ml"), // White rum
    new CocktailIngredient(currentId++, 11, 39, "30ml"), // Coconut cream
    new CocktailIngredient(currentId++, 11, 40, "90ml"), // Pineapple juice
    new CocktailIngredient(currentId++, 11, 41, "As needed"), // Ice

    // Margarita
    new CocktailIngredient(currentId++, 12, 42, "50ml"), // Tequila
    new CocktailIngredient(currentId++, 12, 43, "25ml"), // Triple sec
    new CocktailIngredient(currentId++, 12, 44, "20ml"), // Lime juice
    new CocktailIngredient(currentId++, 12, 45, "For rim"), // Salt

    // Zombie
    new CocktailIngredient(currentId++, 13, 46, "20ml"), // Dark rum
    new CocktailIngredient(currentId++, 13, 47, "20ml"), // White rum
    new CocktailIngredient(currentId++, 13, 48, "15ml"), // Apricot brandy
    new CocktailIngredient(currentId++, 13, 49, "30ml"), // Pineapple juice
    new CocktailIngredient(currentId++, 13, 50, "10ml"), // Lime juice

    // Mai Tai
    new CocktailIngredient(currentId++, 14, 51, "30ml"), // Dark rum
    new CocktailIngredient(currentId++, 14, 52, "30ml"), // White rum
    new CocktailIngredient(currentId++, 14, 53, "15ml"), // Orange curaçao
    new CocktailIngredient(currentId++, 14, 54, "15ml"), // Lime juice

    // Americano
    new CocktailIngredient(currentId++, 15, 55, "30ml"), // Campari
    new CocktailIngredient(currentId++, 15, 56, "30ml"), // Sweet vermouth
    new CocktailIngredient(currentId++, 15, 57, "Top off"), // Soda water

    // Bloody Mary
    new CocktailIngredient(currentId++, 16, 58, "45ml"), // Vodka
    new CocktailIngredient(currentId++, 16, 59, "90ml"), // Tomato juice
    new CocktailIngredient(currentId++, 16, 60, "15ml"), // Lemon juice
    new CocktailIngredient(currentId++, 16, 61, "2 dashes"), // Worcestershire sauce
    new CocktailIngredient(currentId++, 16, 62, "to taste"), // Tabasco
    new CocktailIngredient(currentId++, 16, 63, "to taste"), // Salt and pepper

    // Manhattan
    new CocktailIngredient(currentId++, 17, 64, "60ml"), // Rye whiskey
    new CocktailIngredient(currentId++, 17, 65, "30ml"), // Sweet vermouth
    new CocktailIngredient(currentId++, 17, 66, "2 dashes"), // Angostura bitters

    // Penicillin
    new CocktailIngredient(currentId++, 18, 67, "45ml"), // Blended scotch
    new CocktailIngredient(currentId++, 18, 68, "15ml"), // Honey-ginger syrup
    new CocktailIngredient(currentId++, 18, 69, "20ml"), // Lemon juice
    new CocktailIngredient(currentId++, 18, 70, "7.5ml float"), // Islay scotch

    // Aperol Spritz
    new CocktailIngredient(currentId++, 19, 71, "60ml"), // Aperol
    new CocktailIngredient(currentId++, 19, 72, "90ml"), // Prosecco
    new CocktailIngredient(currentId++, 19, 73, "30ml"), // Soda water

    // Dry Martini
    new CocktailIngredient(currentId++, 20, 74, "60ml"), // Gin
    new CocktailIngredient(currentId++, 20, 75, "10ml"), // Dry vermouth
    new CocktailIngredient(currentId++, 20, 27, "1 for garnish"), // Olive

    // Whiskey Sour
    new CocktailIngredient(currentId++, 21, 76, "50ml"), // Whiskey
    new CocktailIngredient(currentId++, 21, 77, "20ml"), // Lemon juice
    new CocktailIngredient(currentId++, 21, 78, "15ml"), // Simple syrup

    // Daiquiri
    new CocktailIngredient(currentId++, 22, 79, "60ml"), // White rum
    new CocktailIngredient(currentId++, 22, 80, "20ml"), // Lime juice
    new CocktailIngredient(currentId++, 22, 81, "10ml"), // Simple syrup

];

export const getIngredientsByCocktailId = (cocktailId: number): CocktailIngredient[] => {
    return cocktailIngredientsList.filter(item => item.cocktailId === cocktailId);
};





export default {getIngredientsByCocktailId};