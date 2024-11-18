import { Ingredient } from "../model/ingredient";
import { Pokebowl } from "../model/pokebowl";
import ingredientDb from "../repository/ingredient.db";
import pokebowlDb from "../repository/pokebowl.db";
import { PokebowlInput } from "../types";

const getAllPokebowls = async (): Promise<Pokebowl[]> => pokebowlDb.getAllPokebowls();

const createPokebowl = async ({ naam, type, beschrijving, prijs, maxAantalIngredienten, ingredienten }: PokebowlInput): Promise<Pokebowl> => {

    const pokebowl = new Pokebowl({
        naam: naam,
        type: type,
        prijs: prijs,
        beschrijving: beschrijving,
        maxAantalIngredienten: maxAantalIngredienten,
        ingredienten: []
    });
    const ingredients = await Promise.all(
        ingredienten.map(async (ingr) => {
            if (!ingr.id) {
                throw new Error('Ingredient id is required');
            }
            const ingrId = await ingredientDb.getIngredientById({ id: ingr.id });

            if (!ingrId) {
                throw new Error("Ingredient not found")
            } else {
                return ingrId;
            }

        }));
    ingredients.forEach((ingredient) => pokebowl.addIngredient(ingredient));

    pokebowl.calculatePrice();
    pokebowlDb.createPokebowl(pokebowl);
    return pokebowl;
};

const getPokebowlById = async (id: number): Promise<Pokebowl | null> => {
    const pokebowl = await pokebowlDb.getPokebowlById({ id: id });
    if (!pokebowl) {
        throw new Error(`Pokebowl with id ${id} does not exist.`);
    } else {
        return pokebowl;
    }
}

export default {
    getAllPokebowls,
    createPokebowl,
    getPokebowlById
}