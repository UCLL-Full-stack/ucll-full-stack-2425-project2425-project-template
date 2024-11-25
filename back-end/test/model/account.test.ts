import { Account } from '../../model/account';
import { User } from '../../model/user';

const user = new User({
    nationalRegisterNumber: '01.01.01-001.01',
    name: 'John Doe',
    birthDate: new Date('1990-01-01T00:00:00.000Z'),
    isAdministrator: true,
    phoneNumber: '012345678',
    email: 'john.doe@gmail.com',
    password: 'Password1!',
});
const date = new Date();

test('given: valid values for account, when: creating a account, then: account is created with those values', () => {
    // Given

    // When
    const account = new Account({ isShared: false, type: 'Savings' });
    user.addAccount(account);
    account.addUser(user);

    // Then
    expect(account.getIsShared()).toEqual(false);
    expect(account.getType()).toEqual('Savings');
    expect(account.getUsers()).toEqual([user]);
    expect(account.getBalance()).toEqual(0);
    expect(account.getStartDate().getTime()).toBeCloseTo(date.getTime(), -2);
    expect(account.getEndDate()).toEqual(null);
    expect(account.getStatus()).toEqual('Active');
    expect(account.getTransactions()).toEqual([]);
    expect(user.getAccounts()).toEqual([account]);
});

test('given: true for isShared and one user, when: creating a account, then: error is thrown', () => {
    // Given

    // When
    const createAccount = () => {
        new Account({ isShared: true, type: 'Savings', users: [user] });
    };

    // Then
    expect(createAccount).toThrow('Shared accounts must have at least two users.');
});

test('given: false for isShared and multiple users, when: creating a account, then: error is thrown', () => {
    // Given
    const user2 = new User({
        nationalRegisterNumber: '01.01.01-002.01',
        name: 'John Doe',
        birthDate: new Date('1990-01-01T00:00:00.000Z'),
        isAdministrator: true,
        phoneNumber: '012345678',
        email: 'john.doe@gmail.com',
        password: 'Password1!',
    });

    // When
    const createAccount = () => {
        new Account({ isShared: false, type: 'Savings', users: [user, user2] });
    };

    // Then
    expect(createAccount).toThrow('A personal account can only have one user.');
});

test('given: invalid account type, when: creating a account, then: error is thrown', () => {
    // Given

    // When
    const createAccount = () => {
        new Account({ isShared: false, type: 'Checking', users: [user] });
    };

    // Then
    expect(createAccount).toThrow(
        'Invalid account type. Valid types are: transaction account, savings account, emergency fund account.'
    );
});

test('given: no account type, when: creating a account, then: error is thrown', () => {
    // Given

    // When
    const createAccount = () => {
        new Account({ isShared: false, type: '', users: [user] });
    };

    // Then
    expect(createAccount).toThrow('Account type is required.');
});

test('given: no users, when: creating a account, then: error is thrown', () => {
    // Given

    // When
    const createAccount = () => {
        new Account({ isShared: false, type: 'Savings', users: [] });
    };

    // Then
    expect(createAccount).toThrow('An account must have at least one user.');
});
