import { Expense } from "../../model/expense";

test("given: valid values for Expense, when: Expense is created, then: Expense is created with those values", () => {
    const expense = new Expense({
        totalCost: 1000,
        month: '01-2021',
    });
    expect(expense.getTotalCost()).toEqual(1000);
    expect(expense.getMonth()).toEqual('01-2021');
});

