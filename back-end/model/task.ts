import { User } from "./user";

export class Task{
    private taskId: string;
    private title: string;
    private description: string;
    private dueDate: Date;
    private assignees: User[];

    constructor(taskId: string, title: string, description: string, dueDate: Date, assignees: User[]){
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.assignees = assignees;
    }
}