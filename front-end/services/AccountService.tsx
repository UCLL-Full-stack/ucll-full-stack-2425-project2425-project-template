import { Account } from "@/types";

const getAccountById = async (
    id: number
    ): Promise<Account> => {
    const token = JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.token;
    
    const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/account/" + id,
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        }
    );
    
    if (!response.ok) {
        throw new Error("Failed to fetch account");
    }
    
    return response.json();
};

const getAccountByAccountNumber = async (accountNumber: string): Promise<Account> => {
    const token = JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.token;
    
    const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/account/accountNumber/" + accountNumber,
        {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        }
    );
    
    if (!response.ok) {
        throw new Error("Failed to fetch account");
    }
    
    return response.json();
}

const AccountService = { getAccountById, getAccountByAccountNumber };

export default AccountService;