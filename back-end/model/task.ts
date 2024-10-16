import { User } from "./user";

export class Task {
    task_Id: any;
    readonly name: string;
    readonly description: string;
    readonly due_date: Date;
    readonly users: User[] = [];

    constructor(task: {
        task_Id: any;
        name: string;
        description: string;
        due_date: Date;
        users: User[];
    }) {
        this.task_Id = task.task_Id;
        this.name = task.name;
        this.description = task.description;
        this.due_date = task.due_date;
        this.users = task.users;

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

    equals(task: Task): boolean {
        return this.task_Id === task.getTaskId() &&
            this.name === task.getName() &&
            this.description === task.getDescription() &&
            this.due_date === task.getDueDate() &&
            this.users === task.getUsers();
    }
    addUserToTaskx(user: User) {
        if (!this.users.includes(user))
            this.users.push(user);
    }
}