import expenseDb from "../repository/expense.db";

const getAllExpenses = async () => {
    try {
        const expenses = await expenseDb.getAllExpenses();
        
        
        if (!expenses || expenses.length === 0) {
            throw new Error("No expenses found.");
        }

        return expenses;
    } catch (error) {
        console.error("Error fetching expenses:", error);
        throw new Error("Failed to retrieve expenses.");
    }
}

export default {
    getAllExpenses
};