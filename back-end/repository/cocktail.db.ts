import { Cocktail } from "../model/cocktail";

let currentId = 1;

const cocktailsList = [
    new Cocktail(currentId++, "Mojito", "A refreshing Cuban cocktail with lime, mint, and rum.", 3, "/images/mojito.jpg"),
    new Cocktail(currentId++, "Moscow Mule", "A cocktail made with vodka, ginger beer, and lime.", 3, "/images/moscowMule.jpg"),
    new Cocktail(currentId++, "Amaretto Sour", "A cocktail made with Amaretto liqueur and lemon juice.", 2, "/images/amarettoSour.jpg"),
    new Cocktail(currentId++, "Pornstar Martini", "A cocktail with passion fruit and vanilla vodka.", 4, "/images/pornstarMartini.jpg"),
    new Cocktail(currentId++, "Caipirinha", "A Brazilian cocktail with cachaça, lime, and sugar.", 4, "/images/caipirinha.jpg"),
    new Cocktail(currentId++, "Vesper", "A gin and vodka martini with Lillet Blanc.", 4, "/images/vesper.jpg"),
    new Cocktail(currentId++, "Vodka Martini", "A vodka martini served with an olive.", 4, "/images/vodkaMartini.jpg"),
    new Cocktail(currentId++, "Cosmopolitan", "A vodka cocktail with cranberry and lime.", 3, "/images/cosmopolitan.jpg"),
    new Cocktail(currentId++, "Carajillo", "A coffee cocktail with espresso and liqueur.", 2, "/images/carajillo.jpg"),
    new Cocktail(currentId++, "Gin Basil Smash", "A gin cocktail with lemon and basil.", 3, "/images/ginBasilSmash.jpg"),
    new Cocktail(currentId++, "Pina Colada", "A tropical cocktail with rum and coconut.", 3, "/images/pinaColada.jpg"),
    new Cocktail(currentId++, "Margarita", "A tequila cocktail with lime and salt rim.", 4, "/images/margarita.jpg"),
    new Cocktail(currentId++, "Zombie", "A strong rum cocktail with fruit juices.", 5, "/images/zombie.jpg"),
    new Cocktail(currentId++, "Mai Tai", "A rum cocktail with curaçao and lime.", 5, "/images/maiTai.jpg"),
    new Cocktail(currentId++, "Americano", "A Campari and vermouth cocktail with soda.", 2, "/images/americano.jpg"),
    new Cocktail(currentId++, "Bloody Mary", "A vodka and tomato juice cocktail.", 3, "/images/bloodyMary.jpg"),
    new Cocktail(currentId++, "Manhattan", "A whiskey cocktail with vermouth and bitters.", 4, "/images/manhattan.jpg"),
    new Cocktail(currentId++, "Penicillin", "A scotch cocktail with honey-ginger syrup.", 4, "/images/penicillin.jpg"),
    new Cocktail(currentId++, "Aperol Spritz", "A spritz cocktail with Aperol and prosecco.", 2, "/images/aperolSpritz.jpg"),
    new Cocktail(currentId++, "Dry Martini", "A classic gin martini with dry vermouth.", 5, "/images/dryMartini.jpg"),
    new Cocktail(currentId++, "Whiskey Sour", "A whiskey cocktail with lemon juice.", 3, "/images/whiskeySour.jpg"),
    new Cocktail(currentId++, "Daiquiri", "A rum cocktail with lime juice and syrup.", 3, "/images/daiquiri.jpg"),
];
const getAllCocktails = (): Cocktail[] => cocktailsList;

const getCocktailById = ({ id }: { id: number }): Cocktail | null => {
    return cocktailsList.find((cocktail) => cocktail.getId() === id) || null;
};

const getCocktailByName = ({ name }: { name: string }): Cocktail | null => {
    return cocktailsList.find((cocktail) => cocktail.getName() === name) || null;
}

const addCocktail = ({ name, description, strongness, imageUrl }: { name: string; description: string; strongness: number; imageUrl: string }): Cocktail => {
    const newCocktail = new Cocktail(currentId++, name, description, strongness, imageUrl);
    cocktailsList.push(newCocktail);
    return newCocktail;
};

export default { getAllCocktails, getCocktailById, getCocktailByName , addCocktail};
