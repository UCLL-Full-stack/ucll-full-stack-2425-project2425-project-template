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

    public setColumnId(columnId: string): void{
        this.columnId = columnId;
    }

    public setColumnName(columnName: string): void{
        this.columnName = columnName;
    }

    public setTasks(tasks: Task[]): void{
        this.tasks = tasks;
    }

    public addTask(task: Task): void{
        this.tasks.push(task);
    }

    public removeTask(taskId: string): void{
        this.tasks = this.tasks.filter(task => task.getTaskId() !== taskId);
    }

    public getColumnId(): string{
        return this.columnId;
    }

    public getColumnName(): string{
        return this.columnName;
    }

    public getTasks(): Task[]{
        return this.tasks;
    }
}