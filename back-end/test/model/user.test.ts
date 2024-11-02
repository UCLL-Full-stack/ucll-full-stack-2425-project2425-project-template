import { User } from '../../model/User';
import { Recipe } from '../../model/Recipe';
import { Review } from '../../model/Review';

let mockRecipe: Recipe;
let mockReview: Review;

beforeEach(() => {
    // Mock Recipe and Review dependencies
    mockRecipe = {
        id: 1,
        name: 'Mock Recipe',
        description: 'Mock description',
        ingredients: [],
        creator: {} as User,
        reviews: [],
        equals: jest.fn().mockReturnValue(true),
    };

    mockReview = {
        id: 1,
        writer: {} as User,
        text: 'Mock Review',
        score: 5,
        recipe: mockRecipe,
        equals: jest.fn().mockReturnValue(true),
    };
});

test('given valid user data, when a User is created, then properties are correctly assigned', () => {
    // given
    const username = 'testuser';
    const password = 'password123';
    const email = 'test@example.com';
    const firstName = 'Test';
    const lastName = 'User';
    const recipes = [mockRecipe];
    const reviews = [mockReview];

    // when
    const user = new User(username, password, email, firstName, lastName, recipes, reviews);

    // then
    expect(user.username).toBe(username);
    expect(user.password).toBe(password);
    expect(user.email).toBe(email);
    expect(user.firstName).toBe(firstName);
    expect(user.lastName).toBe(lastName);
    expect(user.recipies).toEqual(recipes);
    expect(user.reviews).toEqual(reviews);
});

test('given two users with the same username and email, when compared, then equals() returns true', () => {
    // given
    const user1 = new User('testuser', 'password123', 'test@example.com', 'Test', 'User', [mockRecipe], [mockReview]);
    const user2 = new User('testuser', 'anotherpassword', 'test@example.com', 'Test2', 'User2', [], []);

    // then
    expect(user1.equals(user2)).toBe(true);
});

test('given two users with different usernames or emails, when compared, then equals() returns false', () => {
    // given
    const user1 = new User('testuser', 'password123', 'test@example.com', 'Test', 'User', [mockRecipe], [mockReview]);
    const user2 = new User('anotheruser', 'password123', 'another@example.com', 'Test', 'User', [mockRecipe], [mockReview]);

    // then
    expect(user1.equals(user2)).toBe(false);
});
