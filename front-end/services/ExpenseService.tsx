const getToken = () => {
    const user = sessionStorage.getItem('loggedInUser');
    if (user) {
        const parsedUser = JSON.parse(user)
        if (parsedUser.role === 'admin' || parsedUser.role === 'manager') {
            return parsedUser?.token;
        }
    }
    return null;
};

const getExpenses = async () => {
    const token = getToken();

    return fetch(process.env.NEXT_PUBLIC_API_URL + "/expenses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
    })
};

const ExpenseService = {
    getExpenses,
};

export default ExpenseService;