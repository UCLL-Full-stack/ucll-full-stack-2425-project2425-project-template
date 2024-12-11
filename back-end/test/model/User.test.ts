import { User } from '../../model/User';

test('given: valid values for User, when: User is created, then: User is created with those values', () => {
    // given
    const username = 'testuser';
    const name = 'John';
    const surname = 'Doe';
    const email = 'john.doe@mail.com';
    const password = 'password123';
    const permission = "USER";
    const createdAt = new Date();
    const id = 1;

    // when
    const user = new User({username, name, surname, email, password, permission, createdAt, id});

    // then
    expect(user.getUsername()).toBe(username);
    expect(user.getPassword()).toBe(password);
    expect(user.getId()).toBe(id);
});