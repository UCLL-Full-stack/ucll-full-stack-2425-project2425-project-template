import { User } from "../../model/user";


let user: User;

beforeEach(() => {
    user = new User({
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        password: 'securepassword',
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

test('givenValidUserData_whenUserIsCreated_thenUserHasThoseValues', () => {
    // then
    expect(user.id).toBe(1);
    expect(user.name).toBe('Alice');
    expect(user.email).toBe('alice@example.com');
    expect(user.password).toBe('securepassword');
});

test('givenNewName_whenNameIsUpdated_thenNameIsChanged', () => {
    // when
    user.name = 'Bob';

    // then
    expect(user.name).toBe('Bob');
});

test('givenNewEmail_whenEmailIsUpdated_thenEmailIsChanged', () => {
    // when
    user.email = 'bob@example.com';

    // then
    expect(user.email).toBe('bob@example.com');
});

test('givenNewPassword_whenPasswordIsUpdated_thenPasswordIsChanged', () => {
    // when
    user.password = 'newsecurepassword';

    // then
    expect(user.password).toBe('newsecurepassword');
});

test('givenTwoIdenticalUsers_whenEqualsIsCalled_thenItReturnsTrue', () => {
    // given
    const identicalUser = new User({
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        password: 'securepassword',
    });

    // then
    expect(user.equals(identicalUser)).toBe(true);
});

test('givenTwoDifferentUsers_whenEqualsIsCalled_thenItReturnsFalse', () => {
    // given
    const differentUser = new User({
        id: 2,
        name: 'Bob',
        email: 'bob@example.com',
        password: 'anotherpassword',
    });

    // then
    expect(user.equals(differentUser)).toBe(false);
});