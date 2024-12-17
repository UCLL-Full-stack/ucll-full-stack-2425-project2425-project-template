import { Account } from "@/types";
import { error } from "console";

const getAccountsForUser = async (): Promise<Account[]> => {
    try {
        const token = JSON.parse(localStorage.getItem("loggedInUser") || "{}")?.token;
        const response = await fetch( process.env.NEXT_PUBLIC_API_URL + "/account", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
        });
        
        if (!response.ok) {
            throw new Error("failed loading accounts.");
        }

        const accounts = await response.json();
        return accounts;
    } catch (error: any) {
        throw error;
    }
};

const AccountService = {
    getAccountsForUser,
};

export default AccountService;