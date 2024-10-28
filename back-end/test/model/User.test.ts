import { User } from '../../model/User';

test('given: valid values for User, when: User is created, then: User is created with those values', () => {
    // given
    const username = 'testuser';
    const password = 'password123';
    const id = 1;

    // when
    const user = new User(username, password, id);

    // then
    expect(user.getUsername()).toBe(username);
    expect(user.getPassword()).toBe(password);
    expect(user.getId()).toBe(id);
});