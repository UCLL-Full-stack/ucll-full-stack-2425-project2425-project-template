import { User } from "./user";

export class Task{
    private taskId: string;
    private title: string;
    private description: string;
    private dueDate: Date;
    private assignees: User[];

    constructor(taskId: string, title: string, description: string, dueDate: Date, assignees: User[]){
        this.validate(taskId, title, description, dueDate);
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.assignees = assignees;
    }

    public setTaskId(taskId: string): void{
        this.taskId = taskId;
    }

    public setTitle(title: string): void{
        this.title = title;
    }

    public setDescription(description: string): void{
        this.description = description;
    }

    public setDueDate(dueDate: Date): void{
        this.dueDate = dueDate;
    }

    public setAssignees(assignees: User[]): void{
        this.assignees = assignees;
    }

    public addAssignee(assignee: User): void{
        this.assignees.push(assignee);
    }

    public removeAssignee(userId: string): void{
        this.assignees = this.assignees.filter(assignee => assignee.getUserId() !== userId);
    }

    public getTaskId(): string{
        return this.taskId;
    }

    public getTitle(): string{
        return this.title;
    }

    public getDescription(): string{
        return this.description;
    }

    public getDueDate(): Date{
        return this.dueDate;
    }

    public getAssignees(): User[]{
        return this.assignees;
    }

    public validate( taskId: String, title: String, description: String, dueDate: Date): void{
        if(!taskId){
            throw new Error("Task ID is required");
        }
        if(!title){
            throw new Error("Task Title is required");
        }
        if(!description){
            throw new Error("Task Description is required");
        }
        if(!dueDate){
            throw new Error("Task Due Date is required");
        }
    }
}