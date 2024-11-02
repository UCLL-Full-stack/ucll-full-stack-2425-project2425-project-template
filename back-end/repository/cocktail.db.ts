import { Cocktail } from "../model/cocktail";

let currentId = 1;

const cocktailsList = [
    new Cocktail(currentId++, "Mojito", "A refreshing Cuban cocktail with lime, mint, and rum.", 3, "/images/mojito.jpg"),
    new Cocktail(currentId++, "Moscow Mule", "A cocktail made with vodka, ginger beer, and lime.", 3, "/images/moscowMule.jpg"),
    new Cocktail(currentId++, "Amaretto Sour", "A cocktail made with Amaretto liqueur and lemon juice.", 2, "/images/amarettoSour.jpg"),
    
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
