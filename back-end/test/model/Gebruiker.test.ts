import { Gebruiker } from '../../model/user';

test('given: valid values for Gebruiker, when: Gebruiker is created, then: Gebruiker is created with those values', () => {
    // given
    const username = 'gebruiker';
    const password = 'password123';
    const id = 1;

    // when
    const gebruiker = new Gebruiker({username, password, id});

    // then
    expect(gebruiker.getUsername()).toBe(username);
    expect(gebruiker.getPassword()).toBe(password);
    expect(gebruiker.getId()).toBe(id);
});