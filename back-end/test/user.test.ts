import { User } from "../model/user";


test('given: valid user data, when: user is created, then: user properties are set correctly', () => {
    // given
    const user = new User({
        id: 1,
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'securepassword123',
        role: 'admin',
    })
    // when

    // then
    expect(user.getId()).toEqual(1);
    expect(user.getFirstName()).toEqual('Jane');
    expect(user.getLastName()).toEqual('Doe');
    expect(user.getEmail()).toEqual('jane.doe@example.com');
    expect(user.getPassword()).toEqual('securepassword123');
    expect(user.getRole()).toEqual('admin');
});

test('given: missing optional ID, when: user is created, then: ID is undefined', () => {
    // given
    const user =  new User({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'securepassword123',
        role: 'user',
    })

    // when

    // then
    expect(user.getId()).toBeUndefined();
    expect(user.getRole()).toEqual('user');
});

test('given: invalid user data, when: missing first name, then: throws error', () => {
    // given
    const incompleteUserData = () => new User({
        id: 1,
        firstName: '',
        lastName: 'Delvaux',
        email: 'wiebe@gmai.com',
        password: 'test1',
        role: 'user',
    });

    // when & then
    expect(incompleteUserData).toThrow('First name is required');
});
test('given: invalid user data, when: missing last name, then: throws error', () => {
    // given
    const incompleteUserData = () => new User({
        id: 1,
        firstName: 'Wiebe',
        lastName: '',
        email: 'wiebe@gmai.com',
        password: 'test1',
        role: 'user',
    })

    // when & then
    expect(incompleteUserData).toThrow('Last name is required');
});

test('given: invalid user data, when: missing email, then: throws error', () => {
    // given
    const incompleteUserData = () => new User({
        id: 1,
        firstName: 'Wiebe',
        lastName: 'Delvaux',
        email: '',
        password: 'test1',
        role: 'user',
    })

    // when & then
    expect(incompleteUserData).toThrow('Email is required');
});

test('given: invalid user data, when: missing password, then: throws error', () => {
    // given
    const incompleteUserData = () => new User({
        id: 1,
        firstName: 'Wiebe',
        lastName: 'Delvaux',
        email: 'wiebe@gmai.com',
        password: '',
        role: 'user',
    })

    // when & then
    expect(incompleteUserData).toThrow('Password is required');
});

test('given: missing role, when: user is created, then: role defaults to "user"', () => {
    // given
    const userData = new User({
        id: 1,
        firstName: 'Frans',
        lastName: 'Fransen',
        email: 'frans.fransen@ucll.be',
        password: 'mypassword',
    })

    // when

    // then
    expect(userData.getRole()).toEqual('user');
});
