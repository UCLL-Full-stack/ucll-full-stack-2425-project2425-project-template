import { Ingredient } from "../model/ingredient";
import { Pokebowl } from "../model/pokebowl";

let addId = 3;
const pokebowls = [
    new Pokebowl({
        id: 1,
        naam: "Salmon pokebowl",
        type: "Salmon",
        beschrijving: "Fishy salmon pokebowl with avocado and spicy mayo",
        prijs: 10.45,
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
    new Pokebowl({
        id: 2,
        naam: "Tuna pokebowl",
        type: "Tuna",
        prijs: 11.88,
        beschrijving: "Fishy tuna pokebowl with seaweed, corn and srirachia sauce",
        maxAantalIngredienten: 6,
        ingredienten: [
            new Ingredient({
                id: 4,
                naam: 'Tuna',
                type: 'Protein',
                aantal: 50,
                prijs: 3.61
            }),
            new Ingredient({
                id: 5,
                naam: 'Corn',
                type: 'Topping',
                aantal: 198,
                prijs: 0.54
            }),
            new Ingredient({
                id: 6,
                naam: 'Seaweed',
                type: 'Topping',
                aantal: 228,
                prijs: 1.09
            }),
            new Ingredient({
                id: 7,
                naam: 'Srirachia',
                type: 'Sauce',
                aantal: 450,
                prijs: 1.14
            })
        ]
    }),
];


const getAllPokebowls = (): Pokebowl[] => pokebowls;

const createPokebowl = (pokebowl: Pokebowl) => {
    pokebowls.push(pokebowl);
};

const getPokebowlById = ({ id }: { id: number }): Pokebowl | null => {
    return pokebowls.find((pokebowl) => pokebowl.getId() === id) || null;
}

export default { getAllPokebowls, createPokebowl, getPokebowlById }