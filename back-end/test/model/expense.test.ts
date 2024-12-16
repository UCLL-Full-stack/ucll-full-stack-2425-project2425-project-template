import { set } from 'date-fns';
import { Account } from '../../model/account';
import { User } from '../../model/user';
import { Expense } from '../../model/transaction';

const user = new User({
    nationalRegisterNumber: '01.01.01-001.01',
    name: 'John Doe',
    birthDate: new Date('1990-01-01T00:00:00.000Z'),
    isAdministrator: true,
    phoneNumber: '012345678',
    email: 'john.doe@gmail.com',
    password: 'Password1!',
});

test('given: valid values for expense, when: creating a expense, then: expense is created with those values', () => {
    // Given
    const account = new Account({ isShared: false, type: 'Savings', users: [user] });
    const destinationAccount = new Account({ isShared: false, type: 'Transaction', users: [user] });

    // When
    const expense = new Expense({
        amount: 100,
        currency: 'EUR',
        account,
        destination: destinationAccount.getAccountNumber(),
    });

    // Then
    expect(expense.getAmount()).toEqual(100);
    expect(expense.getCurrency()).toEqual('EUR');
    expect(expense.getTransactionType()).toEqual('expense');
    expect(expense.getAccount()).toEqual(account);
    expect(expense.getDestination()).toEqual(destinationAccount.getAccountNumber());
});

test('given: zero amount for expense, when: creating a expense, then: an error is thrown', () => {
    // Given
    const account = new Account({ isShared: false, type: 'Savings', users: [user] });
    const destinationAccount = new Account({ isShared: false, type: 'Transaction', users: [user] });

    // When
    const createExpense = () => {
        new Expense({
            amount: 0,
            currency: 'EUR',
            account,
            destination: destinationAccount.getAccountNumber(),
        });
    };

    // Then
    expect(createExpense).toThrow('Amount must be greater than 0.');
});

test('given: negative amount for expense, when: creating a expense, then: an error is thrown', () => {
    // Given
    const account = new Account({ isShared: false, type: 'Savings', users: [user] });
    const destinationAccount = new Account({ isShared: false, type: 'Transaction', users: [user] });

    // When
    const createExpense = () => {
        new Expense({
            amount: -1,
            currency: 'EUR',
            account,
            destination: destinationAccount.getAccountNumber(),
        });
    };

    // Then
    expect(createExpense).toThrow('Amount must be greater than 0.');
});

test('given: invalid currency for expense, when: creating a expense, then: an error is thrown', () => {
    // Given
    const account = new Account({ isShared: false, type: 'Savings', users: [user] });
    const destinationAccount = new Account({ isShared: false, type: 'Transaction', users: [user] });

    // When
    const createExpense = () => {
        new Expense({
            amount: 100,
            currency: 'AUD',
            account,
            destination: destinationAccount.getAccountNumber(),
        });
    };

    // Then
    expect(createExpense).toThrow('Currency must be either USD, EUR or GBP.');
});

test('given: empty destination for expense, when: creating a expense, then: an error is thrown', () => {
    // Given
    const account = new Account({ isShared: false, type: 'Savings', users: [user] });

    // When
    const createExpense = () => {
        new Expense({
            amount: 100,
            currency: 'EUR',
            account,
            destination: '',
        });
    };

    // Then
    expect(createExpense).toThrow('Destination is required');
});
