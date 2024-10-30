import { Ingredient } from "../model/ingredient";
import { Pokebowl } from "../model/pokebowl";
import pokebowlDb from "../repository/pokebowl.db";
import { PokebowlInput } from "../types";

const getAllPokebowls = async (): Promise<Pokebowl[]> => pokebowlDb.getAllPokebowls();

const createPokebowl = async ({ naam, type, beschrijving, maxAantalIngredienten, ingredienten }: PokebowlInput): Promise<Pokebowl> => {

    const pokebowl = new Pokebowl({
        naam: naam,
        type: type,
        beschrijving: beschrijving,
        maxAantalIngredienten: maxAantalIngredienten,
        ingredienten: []
    });

    ingredienten.forEach((ingr) => {
        const nieuweIngredient = new Ingredient(ingr);
        pokebowl.addIngredient(nieuweIngredient);
    })

    pokebowlDb.createPokebowl(pokebowl);

    return pokebowl;
};

const getPokebowlById = async (id: number): Promise<Pokebowl | null> => {
    const pokebowl = pokebowlDb.getPokebowlById({ id: id });
    if (!pokebowl) {
        throw new Error(`Pokebowl with id ${id} does not exist.`);
    } else {
        return pokebowl;
    }
}

export default { getAllPokebowls, createPokebowl, getPokebowlById }