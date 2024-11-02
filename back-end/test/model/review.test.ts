import { Review } from '../../model/Review';
import { User } from '../../model/User';
import { Recipe } from '../../model/Recipe';

let mockUser: User;
let mockRecipe: Recipe;

beforeEach(() => {
    // Mock dependencies
    mockUser = {} as User;
    mockRecipe = {} as Recipe;
});

test('given valid review data, when a Review is created, then properties are correctly assigned', () => {
    // given
    const text = 'Great recipe!';
    const score = 5;
    const writer = mockUser;
    const recipe = mockRecipe;

    // when
    const review = new Review(writer, text, score, recipe);

    // then
    expect(review.writer).toBe(writer);
    expect(review.text).toBe(text);
    expect(review.score).toBe(score);
    expect(review.recipe).toBe(recipe);
});

test('given two reviews with the same text, score, writer, and recipe, when compared, then equals() returns true', () => {
    // given
    const review1 = new Review(mockUser, 'Amazing recipe', 5, mockRecipe);
    const review2 = new Review(mockUser, 'Amazing recipe', 5, mockRecipe);

    // then
    expect(review1.equals(review2)).toBe(true);
});

test('given two reviews with different texts, scores, writers, or recipes, when compared, then equals() returns false', () => {
    // given
    const review1 = new Review(mockUser, 'Amazing recipe', 5, mockRecipe);
    const differentUser = {} as User;
    const differentRecipe = {} as Recipe;
    const review2 = new Review(differentUser, 'Good recipe', 4, differentRecipe);

    // then
    expect(review1.equals(review2)).toBe(false);
});
