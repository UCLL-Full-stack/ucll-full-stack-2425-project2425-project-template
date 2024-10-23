import { Ingredient } from "../model/ingredient";

const ingredienten = [
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
    }),
];

const getAllIngredienten = (): Ingredient[] => ingredienten;

const addIngredient = (ingredient: Ingredient) => {
    ingredienten.push(ingredient);
};

export default { getAllIngredienten, addIngredient }
