import { User } from '../../model/user';

test('given: valid values for user, when: user is created, then: user is created with those values', () => {
    // given, when
    const testUser = new User({
        name: 'test',
        email: 'test@email.be',
        password: 'password',
        birthday: new Date(2005, 10, 20),
    });

    // then
    expect(testUser.getName()).toEqual('test');
    expect(testUser.getEmail()).toEqual('test@email.be');
    expect(testUser.getPassword()).toEqual('password');
    expect(testUser.getBirthday()).toEqual(new Date(2005, 10, 20));
});

test('given: invalid values for user, when: user is created, then: throw an error', () => {
    // given, when
    const createUserName = () => {
        const user = new User({
            name: '',
            email: 'test@test.be',
            password: 'test',
            birthday: new Date(),
        });
    };
    const createUserEmail = () => {
        const user = new User({
            name: 'test',
            email: '',
            password: 'test',
            birthday: new Date(),
        });
    };
    const createUserEmailIncorrect = () => {
        const user = new User({
            name: 'test',
            email: 'testwrongemail',
            password: 'test',
            birthday: new Date(),
        });
    };
    const createUserPassword = () => {
        const user = new User({
            name: 'test',
            email: 'test@test.be',
            password: '',
            birthday: new Date(),
        });
    };

    // then
    expect(createUserName).toThrow('Name is required.');
    expect(createUserEmail).toThrow('E-mail is required');
    expect(createUserEmailIncorrect).toThrow('E-mail is incorrect.');
    expect(createUserPassword).toThrow('Password is required');
});
