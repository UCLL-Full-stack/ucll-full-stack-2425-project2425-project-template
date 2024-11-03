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

    public removeTask(taskId: string): void {
        const taskIndex = this.tasks.findIndex(task => task.getTaskId() === taskId);
        if (taskIndex === -1) {
            throw new Error("Task not found");
        }
        this.tasks.splice(taskIndex, 1);
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

    public validate(columnId: string, columnName: string): void{
        if(!columnId){
            throw new Error("Column ID is required");
        }
        if(!columnName){
            throw new Error("Column Name is required");
        }
    }

    public toJSON(){
        return {
            columnId: this.columnId,
            columnName: this.columnName,
            tasks: this.tasks.map(task => task.toJSON())
        }
    }
}