import { User } from "./user";

export class Task {
    task_Id: any;
    readonly name: string;
    readonly description: string;
    readonly due_date: Date;
    readonly completed: boolean = false;
    readonly users: User[] = [];

    constructor(task: {
        task_Id: any;
        name: string;
        description: string;
        due_date: Date;
        completed: boolean;
        users: User[];
    }) {
        this.validate(task);
        this.task_Id = task.task_Id;
        this.name = task.name;
        this.description = task.description;
        this.due_date = task.due_date;
        this.completed = task.completed;
        this.users = task.users;

    }

    private validate(task: { task_Id: any; name: string; description: string; due_date: Date; users: User[] }) {
        if (!task.name) {
            throw new Error('Name is required');
        }
        if (!task.description) {
            throw new Error('Description is required');
        }
        if (!(task.due_date instanceof Date)) {
            throw new Error('Due date must be a valid date');
        }
        if (!Array.isArray(task.users) || task.users.length === 0) {
            throw new Error('At least one user is required');
        }
    }

    public getTaskId(): number | undefined {
        return this.task_Id;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getDueDate(): Date {
        return this.due_date;
    }

    public getUsers(): User[] {
        return this.users;
    }

    public getCompleted(): boolean {
        return this.completed;
    }

    equals(task: Task): boolean {
        return this.task_Id === task.getTaskId() &&
            this.name === task.getName() &&
            this.description === task.getDescription() &&
            this.due_date === task.getDueDate() &&
            this.users === task.getUsers() &&
            this.completed === task.getCompleted();
    }
    addUserToTask(user: User) {
        if (!this.users.includes(user))
            this.users.push(user);
    }
}