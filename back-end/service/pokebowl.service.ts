import { Ingredient } from "../model/ingredient";
import { Pokebowl } from "../model/pokebowl";
import ingredientDb from "../repository/ingredient.db";
import pokebowlDb from "../repository/pokebowl.db";
import { PokebowlInput } from "../types";
import ingredientService from "./ingredient.service";

const getAllPokebowls = async (): Promise<Pokebowl[]> => pokebowlDb.getAllPokebowls();

const createPokebowl = async ({ naam, type, beschrijving, prijs, maxAantalIngredienten, ingredienten }: PokebowlInput): Promise<Pokebowl> => {

    const lengte = (await getAllPokebowls()).length

    const pokebowl = new Pokebowl({
        id: lengte + 1,
        naam: naam,
        type: type,
        prijs: prijs,
        beschrijving: beschrijving,
        maxAantalIngredienten: maxAantalIngredienten,
        ingredienten: []
    });

    ingredienten.forEach((ingr) => {
        if (!ingr.id) {
            throw new Error('Ingredient id is required');
        }
        const ingrId = ingredientDb.getIngredientById({ id: ingr.id });

        if (!ingrId) {
            throw new Error("Ingredient not found")
        } else {
            // const nieuweIngredient = new Ingredient(ingr);
            pokebowl.addIngredient(ingrId);
        }

    })
    pokebowlDb.createPokebowl(pokebowl);
    pokebowl.calculatePrice();

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