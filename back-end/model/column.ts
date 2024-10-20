import { Task } from "./task";

export class Column{
    private columnId: string;
    private columnName: string;
    private tasks: Task[];

    constructor(columnId: string, columnName: string, tasks: Task[]){
        this.columnId = columnId;
        this.columnName = columnName;
        this.tasks = tasks;
    }
}