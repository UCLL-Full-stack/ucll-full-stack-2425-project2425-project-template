import { Account } from '../model/account';
import { Income } from '../model/income';
import database from '../util/database';

const createIncome = async (income: Income): Promise<Income> => {
    try {
        const incomePrisma = await database.income.create({
            data: {
                referenceNumber: income.getReferenceNumber(),
                date: income.getDate(),
                amount: income.getAmount(),
                currency: income.getCurrency(),
                sourceAccountId: income.getSourceAccount().getId(),
                destinationAccountId: income.getDestinationAccount().getId(),
            },
            include: {
                sourceAccount: true,
                destinationAccount: true,
            },
        });

        return Income.from({
            ...incomePrisma,
            sourceAccount: Account.from({
                ...incomePrisma.sourceAccount,
                transactions: [],
                users: [],
            }),
            destinationAccount: Account.from({
                ...incomePrisma.destinationAccount,
                transactions: [],
                users: [],
            }),
        });
    } catch (error: any) {
        throw new Error('Database error. See server log for details.');
    }
};

export default { createIncome };
