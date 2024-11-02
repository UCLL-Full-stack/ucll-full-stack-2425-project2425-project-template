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

const ingredientsVesper = [
    new Ingredient(21, "Gin", "60ml"),
    new Ingredient(22, "Vodka", "15ml"),
    new Ingredient(23, "Lillet Blanc", "7.5ml"),
    new Ingredient(24, "Lemon twist", "1 (for garnish)"),
];

const ingredientsVodkaMartini = [
    new Ingredient(25, "Vodka", "60ml"),
    new Ingredient(26, "Dry vermouth", "15ml"),
    new Ingredient(27, "Olive", "1 (for garnish)"),
];

const ingredientsCosmopolitan = [
    new Ingredient(28, "Vodka", "45ml"),
    new Ingredient(29, "Triple sec", "15ml"),
    new Ingredient(30, "Cranberry juice", "30ml"),
    new Ingredient(31, "Lime juice", "10ml"),
];

const ingredientsCarajillo = [
    new Ingredient(32, "Coffee liqueur", "45ml"),
    new Ingredient(33, "Espresso", "30ml"),
];

const ingredientsGinBasilSmash = [
    new Ingredient(34, "Gin", "50ml"),
    new Ingredient(35, "Lemon juice", "25ml"),
    new Ingredient(36, "Simple syrup", "15ml"),
    new Ingredient(37, "Basil leaves", "10 leaves"),
];

const ingredientsPinaColada = [
    new Ingredient(38, "White rum", "45ml"),
    new Ingredient(39, "Coconut cream", "30ml"),
    new Ingredient(40, "Pineapple juice", "90ml"),
    new Ingredient(41, "Ice", "as needed"),
];

const ingredientsMargarita = [
    new Ingredient(42, "Tequila", "50ml"),
    new Ingredient(43, "Triple sec", "25ml"),
    new Ingredient(44, "Lime juice", "20ml"),
    new Ingredient(45, "Salt", "for rim"),
];

const ingredientsZombie = [
    new Ingredient(46, "Dark rum", "20ml"),
    new Ingredient(47, "White rum", "20ml"),
    new Ingredient(48, "Apricot brandy", "15ml"),
    new Ingredient(49, "Pineapple juice", "30ml"),
    new Ingredient(50, "Lime juice", "10ml"),
];

const ingredientsMaiTai = [
    new Ingredient(51, "Dark rum", "30ml"),
    new Ingredient(52, "White rum", "30ml"),
    new Ingredient(53, "Orange curaçao", "15ml"),
    new Ingredient(54, "Lime juice", "15ml"),
];

const ingredientsAmericano = [
    new Ingredient(55, "Campari", "30ml"),
    new Ingredient(56, "Sweet vermouth", "30ml"),
    new Ingredient(57, "Soda water", "to top"),
];

const ingredientsBloodyMary = [
    new Ingredient(58, "Vodka", "45ml"),
    new Ingredient(59, "Tomato juice", "90ml"),
    new Ingredient(60, "Lemon juice", "15ml"),
    new Ingredient(61, "Worcestershire sauce", "2 dashes"),
    new Ingredient(62, "Tabasco", "to taste"),
    new Ingredient(63, "Salt and pepper", "to taste"),
];

const ingredientsManhattan = [
    new Ingredient(64, "Rye whiskey", "60ml"),
    new Ingredient(65, "Sweet vermouth", "30ml"),
    new Ingredient(66, "Angostura bitters", "2 dashes"),
];

const ingredientsPenicillin = [
    new Ingredient(67, "Blended scotch", "45ml"),
    new Ingredient(68, "Honey-ginger syrup", "15ml"),
    new Ingredient(69, "Lemon juice", "20ml"),
    new Ingredient(70, "Islay scotch", "7.5ml (float)"),
];

const ingredientsAperolSpritz = [
    new Ingredient(71, "Aperol", "60ml"),
    new Ingredient(72, "Prosecco", "90ml"),
    new Ingredient(73, "Soda water", "30ml"),
];

const ingredientsDryMartini = [
    new Ingredient(74, "Gin", "60ml"),
    new Ingredient(75, "Dry vermouth", "10ml"),
    new Ingredient(27, "Olive", "1 (for garnish)"),
];

const ingredientsWhiskeySour = [
    new Ingredient(76, "Whiskey", "50ml"),
    new Ingredient(77, "Lemon juice", "20ml"),
    new Ingredient(78, "Simple syrup", "15ml"),
];

const ingredientsDaiquiri = [
    new Ingredient(79, "White rum", "60ml"),
    new Ingredient(80, "Lime juice", "20ml"),
    new Ingredient(81, "Simple syrup", "10ml"),
];

const ingredientsEspressoMartini = [
    new Ingredient(82, "Vodka", "45ml"),
    new Ingredient(33, "Espresso", "30ml"),
    new Ingredient(83, "Coffee liqueur", "15ml"),
];

const ingredientsOldFashioned = [
    new Ingredient(84, "Bourbon or rye whiskey", "45ml"),
    new Ingredient(85, "Sugar cube", "1"),
    new Ingredient(66, "Angostura bitters", "2 dashes"),
];

const ingredientsNegroni = [
    new Ingredient(86, "Gin", "30ml"),
    new Ingredient(55, "Campari", "30ml"),
    new Ingredient(56, "Sweet vermouth", "30ml"),
];

const cocktailsList = [
    new Cocktail(1, "Mojito", "A refreshing Cuban cocktail with lime, mint, and rum.", 3, ingredientsMojito, "../public/images/mojito.jpg"),
    new Cocktail(2, "Moscow Mule", "A cocktail made with vodka, ginger beer, and lime.", 3, ingredientsMoscowMule, "../public/images/moscowMule.jpg"),
    new Cocktail(3, "Amaretto Sour", "A cocktail made with Amaretto liqueur and lemon juice.", 2, ingredientsAmarettoSour, "../public/images/amarettoSour.jpg"),
    new Cocktail(4, "Pornstar Martini", "A cocktail with passion fruit and vanilla vodka.", 4, ingredientsPornstarMartini, "../public/images/pornstarMartini.jpg"),
    new Cocktail(5, "Caipirinha", "A Brazilian cocktail with cachaça, lime, and sugar.", 4, ingredientsCaipirinha, "../public/images/caipirinha.jpg"),
    new Cocktail(6, "Vesper", "A gin and vodka martini with Lillet Blanc.", 4, ingredientsVesper, "../public/images/vesper.jpg"),
    new Cocktail(7, "Vodka Martini", "A vodka martini served with an olive.", 4, ingredientsVodkaMartini, "../public/images/vodkaMartini.jpg"),
    new Cocktail(8, "Cosmopolitan", "A vodka cocktail with cranberry and lime.", 3, ingredientsCosmopolitan,";./images/cosmopolitan.jpg"),
    new Cocktail(9, "Carajillo", "A coffee cocktail with espresso and liqueur.", 2, ingredientsCarajillo, "../public/images/carajillo.jpg"),
    new Cocktail(10, "Gin Basil Smash", "A gin cocktail with lemon and basil.", 3, ingredientsGinBasilSmash, "../public/images/ginBasilSmash.jpg"),
    new Cocktail(11, "Pina Colada", "A tropical cocktail with rum and coconut.", 3, ingredientsPinaColada, "../public/images/pinaColada.jpg"),
    new Cocktail(12, "Margarita", "A tequila cocktail with lime and salt rim.", 4, ingredientsMargarita, "../public/images/margarita.jpg"),
    new Cocktail(13, "Zombie", "A strong rum cocktail with fruit juices.", 5, ingredientsZombie, "../public/images/zombie.jpg"),
    new Cocktail(14, "Mai Tai", "A rum cocktail with curaçao and lime.", 5, ingredientsMaiTai, "../public/images/maiTai.jpg"),
    new Cocktail(15, "Americano", "A Campari and vermouth cocktail with soda.", 2, ingredientsAmericano, "../public/images/americano.jpg"),
    new Cocktail(16, "Bloody Mary", "A vodka and tomato juice cocktail.", 3, ingredientsBloodyMary, "../public/images/bloodyMary.jpg"),
    new Cocktail(17, "Manhattan", "A whiskey cocktail with vermouth and bitters.", 4, ingredientsManhattan, "../public/images/manhattan.jpg"),
    new Cocktail(18, "Penicillin", "A scotch cocktail with honey-ginger syrup.", 4, ingredientsPenicillin, "../public/images/penicillin.jpg"),
    new Cocktail(19, "Aperol Spritz", "A spritz cocktail with Aperol and prosecco.", 2, ingredientsAperolSpritz, "../public/images/aperolSpritz.jpg"),
    new Cocktail(20, "Dry Martini", "A classic gin martini with dry vermouth.", 5, ingredientsDryMartini, "../public/images/dryMartini.jpg"),
    new Cocktail(21, "Whiskey Sour", "A whiskey cocktail with lemon juice.", 3, ingredientsWhiskeySour, "../public/images/whiskeySour.jpg"),
    new Cocktail(22, "Daiquiri", "A rum cocktail with lime juice and syrup.", 3, ingredientsDaiquiri, "../public/images/daiquiri.jpg"),
    new Cocktail(23, "Espresso Martini", "A vodka cocktail with espresso and liqueur.", 4, ingredientsEspressoMartini, "../public/images/espressoMartini.jpg"),
    new Cocktail(24, "Old Fashioned", "A whiskey cocktail with sugar and bitters.", 5, ingredientsOldFashioned, "../public/images/oldFashioned.jpg"),
    new Cocktail(25, "Negroni", "A gin cocktail with Campari and vermouth.", 4, ingredientsNegroni, "../public/images/negroni.jpg"),
];
const getAllCocktails = (): Cocktail[] => cocktailsList;

const getCocktailById = ({ id }: { id: number }): Cocktail | null => {
    return cocktailsList.find((cocktail) => cocktail.getId() === id) || null;
};

const getCocktailByName = ({ name }: { name: string }): Cocktail | null => {
    return cocktailsList.find((cocktail) => cocktail.getName() === name) || null;
}

export default { getAllCocktails, getCocktailById, getCocktailByName };
