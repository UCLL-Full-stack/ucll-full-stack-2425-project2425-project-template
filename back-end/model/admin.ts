import { Expense } from './expense';
import { User } from './user';

export class Admin {
    private id?: number;
    private name: string;
    private user: User;
    private expenses: Expense[];

    constructor(admin: { id?: number; user: User; expenses: Expense[]; name: string }) {
        
        if (!admin.name || admin.name.trim() === "") {
            throw new Error("Name is required and cannot be empty.");
        }
        if (!admin.user) throw new Error("User is required.");
        if (!admin.expenses) throw new Error("Expense is required.");

        
        this.id = admin.id;
        this.name = admin.name;
        this.user = admin.user;
        this.expenses = admin.expenses;

        
        if (!this.userHasAdminRole()) {
            throw new Error("User does not have admin privileges.");
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getName(): string {
        return this.name;
    }
    
    getExpenses(): Expense [] {
        return this.expenses;   
    }

    equals(admin: Admin): boolean {
        return (
            this.id === admin.getId() &&
            this.user.equals(admin.getUser())
        );
    }

    
    private userHasAdminRole(): boolean {
        return this.user.getRole() === 'admin';
    }
}
