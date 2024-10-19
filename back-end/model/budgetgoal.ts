export class Budgetgoal {
    private id?: number;
    private goalName: string;
    private targetAmount: number;
    private currentAmount: number;
    private isActive: boolean;

    constructor(budgetgoal: {id?: number; goalName: string; targetAmount: number; currentAmount: number; isActive: boolean;}) {
        this.id = budgetgoal.id
        this.goalName = budgetgoal.goalName;
        this.targetAmount = budgetgoal.targetAmount;
        this.currentAmount = budgetgoal.currentAmount;
        this.isActive = budgetgoal.isActive;
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
}
