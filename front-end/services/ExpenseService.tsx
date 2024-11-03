const getExpenses = async () => {    
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/expenses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
    })
};

const ExpenseService = {
    getExpenses,
};

export default ExpenseService;