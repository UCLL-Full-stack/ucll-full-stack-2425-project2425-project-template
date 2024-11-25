import { set } from 'date-fns';
import { Account } from '../../model/account';
import { User } from '../../model/user';
import { Income } from '../../model/income';

const user = new User({
    nationalRegisterNumber: '01.01.01-001.01',
    name: 'John Doe',
    birthDate: new Date('1990-01-01T00:00:00.000Z'),
    isAdministrator: true,
    phoneNumber: '012345678',
    email: 'john.doe@gmail.com',
    password: 'Password1!',
});

const account = new Account({ isShared: false, type: 'Savings', users: [user] });
const sourceAccount = new Account({ isShared: false, type: 'Transaction', users: [user] });

test('given: valid values for income, when: creating a income, then: income is created with those values', () => {
    // Given

    //When
    const income = new Income({
        amount: 100,
        currency: 'EUR',
        account,
        source: sourceAccount.getAccountNumber(),
    });

    //Then
    expect(income.getAmount()).toEqual(100);
    expect(income.getCurrency()).toEqual('EUR');
    expect(income.getTransactionType()).toEqual('income');
    expect(income.getAccount()).toEqual(account);
    expect(income.getSource()).toEqual(sourceAccount.getAccountNumber());
});

test('given: zero amount for income, when: creating a income, then: an error is thrown', () => {
    // Given

    //When
    const createIncome = () => {
        new Income({
            amount: 0,
            currency: 'EUR',
            account,
            source: sourceAccount.getAccountNumber(),
        });
    };

    //Then
    expect(createIncome).toThrow('Amount must be greater than 0.');
});

test('given: negative amount for income, when: creating a income, then: an error is thrown', () => {
    // Given

    //When
    const createIncome = () => {
        new Income({
            amount: -1,
            currency: 'EUR',
            account,
            source: sourceAccount.getAccountNumber(),
        });
    };

    //Then
    expect(createIncome).toThrow('Amount must be greater than 0.');
});

test('given: invalid currency for income, when: creating a income, then: an error is thrown', () => {
    // Given

    //When
    const createIncome = () => {
        new Income({
            amount: 100,
            currency: 'AUD',
            account,
            source: sourceAccount.getAccountNumber(),
        });
    };

    //Then
    expect(createIncome).toThrow('Currency must be either USD, EUR or GBP.');
});

test('given: empty source for income, when: creating a income, then: an error is thrown', () => {
    // Given

    // When
    const createIncome = () => {
        new Income({
            amount: 100,
            currency: 'EUR',
            account,
            source: '',
        });
    };

    // Then
    expect(createIncome).toThrow('Source is required');
});
