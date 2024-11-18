import { Bestelling } from "../model/bestelling"
import { Ingredient } from "../model/ingredient";
import { Pokebowl } from "../model/pokebowl";
import { User } from "../model/user";
import bestellingDb from "../repository/bestelling.db";
import { BestellingInput, PokebowlInput } from "../types";

// const createBestelling = async ({ datum, user, pokebowls }: BestellingInput): Promise<Bestelling> => {
//     const newUser = new User(user);

//     const bestelling = new Bestelling({
//         user: newUser,
//         datum: datum,
//         pokebowls: []
//     });

//     pokebowls.forEach((pokebowl: PokebowlInput) => {
//         const nieuwePokebowl = new Pokebowl({
//             naam: pokebowl.naam,
//             type: pokebowl.type,
//             beschrijving: pokebowl.beschrijving,
//             prijs: pokebowl.prijs,
//             maxAantalIngredienten: pokebowl.maxAantalIngredienten,
//             ingredienten: []
//         });

//         for (const ingredientInput of pokebowl.ingredienten) {
//             const ingredient = new Ingredient(ingredientInput);
//             nieuwePokebowl.addIngredient(ingredient);
//         }

//         bestelling.addPokebowl(nieuwePokebowl);
//     })

//     bestellingDb.createBestelling(bestelling);
//     return bestelling;
// }

const getAllBestellingen = async (): Promise<Bestelling[]> => bestellingDb.getAllBestellingen();

const getBestellingById = async (id: number): Promise<Bestelling | null> => {
    const bestelling = bestellingDb.getBestellingById({ id: id });
    if (!bestelling) {
        throw new Error(`Bestelling with id ${id} does not exist.`);
    } else {
        return bestelling;
    }
}

export default {
    //createBestelling, 
    getAllBestellingen,
    getBestellingById
}