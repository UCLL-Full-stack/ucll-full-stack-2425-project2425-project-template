import { Expense } from "../model/expense";


const expenses = [
    new Expense({
        totalCost: 1000,
        month: '01-2021',
    }),

    new Expense({
        totalCost: 2000,
        month: '02-2021',
    }),

    new Expense({
        totalCost: 3000,
        month: '03-2021',
    }),

];

const getAllExpenses = (): Expense[] => {
    return expenses;
}

export default {  
    getAllExpenses,
};