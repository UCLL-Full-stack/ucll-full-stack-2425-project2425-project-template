import { Column } from "./column";
import { User } from "./user";
import { Task as TaskPrisma, Column as ColumnPrisma } from "@prisma/client";

export class Task {
    private taskId: string;
    private title: string;
    private description: string;
    private dueDate: Date;
    private assignees: User[] = [];
    private columnId: string;
  
    constructor(taskId: string, title: string, description: string, dueDate: Date, column: string) {
      this.taskId = taskId;
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.columnId = column;
    }

    static from({ taskId, title, description, dueDate, columnId }: TaskPrisma): Task {
        return new Task(taskId, title, description, dueDate, columnId);
    }
  
    getTaskId(): string {
      return this.taskId;
    }
  
    setTitle(title: string): void {
      this.title = title;
    }
  
    getTitle(): string {
      return this.title;
    }
  
    setDescription(description: string): void {
      this.description = description;
    }
  
    getDescription(): string {
      return this.description;
    }
  
    setDueDate(dueDate: Date): void {
      this.dueDate = dueDate;
    }
  
    getDueDate(): Date {
      return this.dueDate;
    }
  
    setAssignees(assignees: User[]): void {
      this.assignees = assignees;
    }
  
    getAssignees(): User[] {
      return this.assignees;
    }
  
    setColumnId(columnId: string): void {
      this.columnId = columnId;
    }
  
    getColumnId(): string {
      return this.columnId;
    }
  }
  