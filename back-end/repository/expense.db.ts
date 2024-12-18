import { Expense } from "../model/expense";
import database from "./database";

const getAllExpenses = async (): Promise<Expense[]> => {
    try {
        const expensePrisma = await database.expense.findMany();
        return expensePrisma.map((expensePrisma) => Expense.from(expensePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createExpense = async (cost: number): Promise<Expense> => {
    try {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const expensePrisma = await database.expense.create({
            data: {
                totalCost: cost,
                month: `${month}-${year}`
            }
        });
        return Expense.from(expensePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}


export default {  
    getAllExpenses,
    createExpense,
};