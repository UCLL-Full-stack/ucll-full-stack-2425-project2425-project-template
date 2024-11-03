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
];

const getAllIngredienten = (): Ingredient[] => ingredienten;

const addIngredient = (ingredient: Ingredient) => {
    ingredienten.push(ingredient);
};

const getIngredientById = ({ id }: { id: number }): Ingredient | null => {
    return ingredienten.find((ingredient) => ingredient.getId() === id) || null;
}

export default { getAllIngredienten, addIngredient, getIngredientById }
