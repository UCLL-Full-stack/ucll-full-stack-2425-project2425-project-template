import { Expense as ExpensePrisma } from '@prisma/client';

export class Expense {
    private id?: number;
    private totalCost: number;
    private month: string;

    constructor(expense: { id?: number; totalCost: number; month: string }) {
        this.validate(expense);

        this.id = expense.id;
        this.totalCost = expense.totalCost;
        this.month = expense.month;
    }

    getId(): number | undefined {
        return this.id;
    }

    getTotalCost(): number {
        return this.totalCost;
    }

    getMonth(): string {
        return this.month;
    }

    validate(expense: {totalCost: number; month: string}){
        if (expense.totalCost < 0) {
            throw new Error('Total cost per month must be a non-negative number.');
        }
        const monthPattern = /^(0[1-9]|1[0-2])-\d{4}$/;
        if (!monthPattern.test(expense.month)) {
            throw new Error('Invalid month format. Use "MM-YYYY".');
        }

        if (!expense.month || expense.month.trim() === '') {
            throw new Error('Month is required and cannot be empty.');
        }
    }

    static from({ id, totalCost, month }: ExpensePrisma) {
        return new Expense({
            id,
            totalCost,
            month,
        });
    }

    equals(expense: Expense): boolean {
        return this.totalCost === expense.getTotalCost() && this.month === expense.getMonth();
    }
}
