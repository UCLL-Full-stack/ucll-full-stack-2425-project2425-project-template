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
    expect(user.getId()).toBe(1);
    expect(user.getName()).toBe('Alice');
    expect(user.getEmail()).toBe('alice@example.com');
    expect(user.getPassword()).toBe('securepassword');
});

test('givenNewName_whenNameIsUpdated_thenNameIsChanged', () => {
    // when
    user.setName('Bob');

    // then
    expect(user.getName()).toBe('Bob');
});

test('givenNewEmail_whenEmailIsUpdated_thenEmailIsChanged', () => {
    // when
    user.setEmail('bob@example.com');

    // then
    expect(user.getEmail()).toBe('bob@example.com');
});

test('givenNewPassword_whenPasswordIsUpdated_thenPasswordIsChanged', () => {
    // when
    user.setPassword('newsecurepassword');

    // then
    expect(user.getPassword()).toBe('newsecurepassword');
});

test('givenTwoIdenticalUsers_whenEqualsIsCalled_thenItReturnsTrue', () => {
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
    const differentUser = new User({
        id: 2,
        name: 'Bob',
        email: 'bob@example.com',
        password: 'anotherpassword',
    });

    // then
    expect(user.equals(differentUser)).toBe(false);
});