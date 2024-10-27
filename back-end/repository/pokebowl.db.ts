import { Ingredient } from "../model/ingredient";
import { Pokebowl } from "../model/pokebowl";

const pokebowls = [
    new Pokebowl({
        id: 1,
        naam: "Salmon pokebowl",
        type: "Salmon",
        beschrijving: "Fishy salmon pokebowl with avocado and spicy mayo",
        maxAantalIngredienten: 5,
        ingredienten: [
            new Ingredient({
                id: 1,
                naam: 'Salmon',
                type: 'Protein',
                aantal: 50,
                prijs: 3.61
            }),
            new Ingredient({
                id: 2,
                naam: 'Avocado',
                type: 'Topping',
                aantal: 30,
                prijs: 2.78
            }),
            new Ingredient({
                id: 3,
                naam: 'Spicy mayo',
                type: 'Sauce',
                aantal: 200,
                prijs: 1.32
            })
        ]
    }),
];


const getAllPokebowls = (): Pokebowl[] => pokebowls;

const createPokebowl = (pokebowl: Pokebowl) => {
    pokebowls.push(pokebowl);
};

export default { getAllPokebowls, createPokebowl }