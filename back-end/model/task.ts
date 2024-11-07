import { User } from "./user";
import { Task as prismaTask } from '@prisma/client';

export class Task {
    readonly taskId: number;
    readonly name: string;
    readonly description: string | null; // Allow description to be nullable
    readonly dueDate: Date;
    readonly completed: boolean;
    readonly users: User[];
  
    constructor(task: { 
      taskId: number, 
      name: string, 
      description: string | null, // description is now nullable
      dueDate: Date, 
      completed: boolean, 
      users: User[] 
    }) {
      this.validate(task);
      this.taskId = task.taskId;
      this.name = task.name;
      this.description = task.description ?? null; // Default to null if no description
      this.dueDate = task.dueDate;
      this.completed = task.completed;
      this.users = task.users;
    }
  
    static from(task: prismaTask & { users: User[] }) {
      return new Task({
        taskId: task.taskId,
        name: task.name,
        description: task.description, // description can be null here
        dueDate: task.dueDate,
        completed: task.completed,
        users: task.users.map(user => User.from(user)),
      });
    }

    private validate(task: { taskId: any; name: string; description: string | null; dueDate: Date; users: User[] }) {
        if (!task.name) {
            throw new Error('Name is required');
        }
        if (!task.description) {
            throw new Error('Description is required');
        }
        if (!(task.dueDate instanceof Date)) {
            throw new Error('Due date must be a valid date');
        }
        if (!Array.isArray(task.users) || task.users.length === 0) {
            throw new Error('At least one user is required');
        }
    }

    public getTaskId(): number | undefined {
        return this.taskId;
    }

    public getName(): string {
        return this.name;
    }

    public getDueDate(): Date {
        return this.dueDate;
    }

    public getUsers(): User[] {
        return this.users;
    }

    public getCompleted(): boolean {
        return this.completed;
    }

    equals(task: Task): boolean {
        return this.taskId === task.getTaskId() &&
            this.name === task.getName() &&
            this.dueDate === task.getDueDate() &&
            this.users === task.getUsers() &&
            this.completed === task.getCompleted();
    }
    addUserToTask(user: User) {
        if (!this.users.includes(user))
            this.users.push(user);
    }
}