import {RecipeIngredient} from "../../model/recipeingredient";

const recipeingredientone = new RecipeIngredient({
    recipeIngredientId: 1,
    recipeId: 1,
    ingredientId: 1,
    unit: "grams",
    quantity: 250,
})
const recipeingredienttwo = new RecipeIngredient({
    recipeIngredientId: 2,
    recipeId: 1,
    ingredientId: 2,
    unit: "grams",
    quantity: 250,
})
const recipeingredients = [recipeingredientone, recipeingredienttwo];

test('given: valid values for recipeingredient, when: recipeingredient is created, then: recipeingredient is created with those values', () => {
    //given
    //when
    const recipeingredientthree = new RecipeIngredient({
        recipeIngredientId: 3,
        recipeId: 1,
        ingredientId: 3,
        unit: "millilitres",
        quantity: 250,
    })
    //then
    expect(recipeingredientthree.getRecipeIngredientId()).toEqual(3);
    expect(recipeingredientthree.getRecipeId()).toEqual(1);
    expect(recipeingredientthree.getIngredientId()).toEqual(3);
    expect(recipeingredientthree.getUnit()).toEqual("millilitres");
    expect(recipeingredientthree.getQuantity()).toEqual(250);
})