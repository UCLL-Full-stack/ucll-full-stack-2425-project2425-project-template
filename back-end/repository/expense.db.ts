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

export default {  
    getAllExpenses,
};