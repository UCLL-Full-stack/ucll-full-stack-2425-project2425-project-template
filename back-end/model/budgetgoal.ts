import { Account } from "./account";

export class Budgetgoal {
    private id?: number;
    private goalName: string;
    private targetAmount: number;
    private currentAmount: number;
    private isActive: boolean;
    private accounts: Account[];

    constructor(budgetgoal: {id?: number; goalName: string; targetAmount: number; currentAmount: number; isActive: boolean; accounts: Account[]}) {
        this.id = budgetgoal.id
        this.goalName = budgetgoal.goalName;
        this.targetAmount = budgetgoal.targetAmount;
        this.currentAmount = budgetgoal.currentAmount;
        this.isActive = budgetgoal.isActive;
        this.accounts = budgetgoal.accounts;
    }

    getId(): number | undefined {
        return this.id;
    }

    getgoalName(): string {
        return this.goalName;
    }

    getTargetAmount(): number {
        return this.targetAmount;
    }

    getCurrentAmount(): number {
        return this.currentAmount;
    }

    getisActive(): boolean {
        return this.isActive;
    }

    getAccounts(): Account[] {
        return this.accounts;
    }
}