import { Recipe } from '../../model/Recipe';
import { Ingredient } from '../../model/Ingredient';
import { User } from '../../model/User';
import { Review } from '../../model/Review';

let mockUser: User;
let mockIngredient: Ingredient;
let mockReview: Review;

beforeEach(() => {
    // Mock dependencies
    mockUser = {} as User;
    mockIngredient = new Ingredient('Sugar', 'Sweetener');
    mockReview = {} as Review;
});

test('given valid recipe data, when a Recipe is created, then properties are correctly assigned', () => {
    // given
    const name = 'Mock Recipe';
    const description = 'Mock description';
    const ingredients = [mockIngredient];
    const creator = mockUser;
    const reviews = [mockReview];

    // when
    const recipe = new Recipe(name, description, ingredients, creator, reviews);

    // then
    expect(recipe.name).toBe(name);
    expect(recipe.description).toBe(description);
    expect(recipe.ingredients).toEqual(ingredients);
    expect(recipe.creator).toBe(creator);
    expect(recipe.reviews).toEqual(reviews);
});

test('given two recipes with the same name and description, when compared, then equals() returns true', () => {
    // given
    const recipe1 = new Recipe('Mock Recipe', 'Mock description', [mockIngredient], mockUser, [mockReview]);
    const recipe2 = new Recipe('Mock Recipe', 'Mock description', [mockIngredient], mockUser, [mockReview]);

    // then
    expect(recipe1.equals(recipe2)).toBe(true);
});

test('given two recipes with different names or descriptions, when compared, then equals() returns false', () => {
    // given
    const recipe1 = new Recipe('Mock Recipe', 'Mock description', [mockIngredient], mockUser, [mockReview]);
    const recipe2 = new Recipe('Another Recipe', 'Different description', [mockIngredient], mockUser, [mockReview]);

    // then
    expect(recipe1.equals(recipe2)).toBe(false);
});
