import { Transaction } from "@/types";

const createExpense = async (
  accountNumber: string,
  expenseData: any
): Promise<Transaction> => {
  const token = JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.token;

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/transaction/" + accountNumber,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(expenseData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create expense");
  }

  return response.json();
};

const getTransactionsByAccountId = async (
  id: number
): Promise<Transaction[]> => {
  const token = JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.token;

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/transaction/account/" + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return response.json();
};

const getTransactionsByUserId = async (id: number): Promise<Transaction[]> => {
  const token = JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.token;

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/transaction/user/" + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return response.json();
};

const TransactionService = {
  createExpense,
  getTransactionsByAccountId,
  getTransactionsByUserId,
};

export default TransactionService;
