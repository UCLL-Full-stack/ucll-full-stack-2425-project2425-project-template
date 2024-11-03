import { RecipeIngredient } from "../../model/recipeingredient"
import ingredientDb from "../../repository/ingredient.db"

const recipeingredientid = 1
const recipeid = 1
const ingredientid = 1
const unit = "grams"
const quantity = 200
const recipeingredient = new RecipeIngredient({
    recipeingredientId: 1,
    recipeId: 1,
    ingredientId: 1,
    unit: unit,
    quantity: quantity
})

let mockRecipeIngredientGetRecipeIngredientById: jest.Mock;

beforeEach(() => {
    mockRecipeIngredientGetRecipeIngredientById = jest.fn()
})

afterEach(() => {
    jest.clearAllMocks()
})

test('given existing recipeingredients, when fetching an existing recipeingredient by id, then return the correct recipeingredients', () => {
    //given
    const recipeingredientone = new RecipeIngredient({ recipeingredientId: 1, recipeId: 1, ingredientId: 1, unit: "grams", quantity: 250 })
    ingredientDb.getRecipeIngredientById = mockRecipeIngredientGetRecipeIngredientById.mockReturnValue(recipeingredientone)
    //when
    const result = ingredientDb.getRecipeIngredientById({ id: 1 })
    //then
    expect(result).toEqual(recipeingredientone)
})
