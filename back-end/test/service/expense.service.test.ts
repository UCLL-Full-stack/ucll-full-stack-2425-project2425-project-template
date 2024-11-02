import expenseDb from '../../repository/expense.db';
import expenseService from '../../service/expense.service';
import { Expense } from '../../model/expense';

const expenseInput = {
    id: 1,
    totalCost: 500,
    month: '01-2022',
};

const expense = new Expense(expenseInput);

let getAllExpensesMock: jest.Mock;

beforeEach(() => {
    getAllExpensesMock = jest.fn();
    expenseDb.getAllExpenses = getAllExpensesMock;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: valid values, when: expenses are retrieved, then: expenses are returned', async () => {
    getAllExpensesMock.mockReturnValue([expense]);

    const expenses = await expenseService.getAllExpenses();

    expect(getAllExpensesMock).toHaveBeenCalledTimes(1);
    expect(expenses).toEqual([expense]);
});

test('given: database call fails, when: getAllExpenses is called, then: an error is thrown', async () => {
    getAllExpensesMock.mockReturnValue([]);

    await expect(expenseService.getAllExpenses()).rejects.toThrow("Failed to retrieve expenses.");
    expect(getAllExpensesMock).toHaveBeenCalledTimes(1);
});
