import { User } from "../../model/user";

const name = 'John Doe';
const email = 'john.doe@example.com';
const password = 'Password123';
const address = '123 Main St';

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    // given

    // when
    const user = new User({ name, email, password, address });

    // then
    expect(user.getName()).toEqual(name);
    expect(user.getEmail()).toEqual(email);
    expect(user.getPassword()).toEqual(password);
    expect(user.getAddress()).toEqual(address);
});

test('given: empty name, when: user is created, then: an error is thrown', () => {
    // given
    const invalidName = '';

    // when
    const user = () => new User({ name: invalidName, email, password, address })

    // then
    expect(user).toThrow('Name cannot be empty');
});

test('given: empty email, when: user is created, then: an error is thrown', () => {
    // given
    const invalidEmail = '';

    // when
    const user = () => new User({ name, email: invalidEmail, password, address })

    // then
    expect(user).toThrow('Email cannot be empty');
});

test('given: empty address, when: user is created, then: an error is thrown', () => {
    // given
    const emptyAddress = '';

    // when
    const user = () => new User({ name, email, password, address: emptyAddress })

    // then
    expect(user).toThrow('Address cannot be empty');
});

test('given: empty password, when: user is created, then: an error is thrown', () => {
    // given
    const emptyPassword = '';

    // when
    const user = () => new User({ name, email, password: emptyPassword, address })

    // then
    expect(user).toThrow('Password cannot be empty');
});

test('given: invalid email, when: user is created, then: an error is thrown', () => {
    // given
    const invalidEmail = 'invalid-email';

    // when
    const user = () => new User({ name, email: invalidEmail, password, address })

    // then
    expect(user).toThrow('Invalid email format');
});


test('given: password shorter than 8 characters, when: user is created, then: an error is thrown', () => {
    // given
    const shortPassword = 'short';

    // when
    const user = () => new User({ name, email, password: shortPassword, address })

    // then
    expect(user).toThrow('Password must be at least 8 characters');
});
