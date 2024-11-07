import { Column } from "./column";
import { User } from "./user";
import { Task as TaskPrisma } from "@prisma/client";

export class Task {
    private taskId: string;
    private title: string;
    private description: string;
    private dueDate: Date;
    private assignees: User[] = [];
    private column: Column;
  
    constructor(taskId: string, title: string, description: string, dueDate: Date, column: Column) {
      this.taskId = taskId;
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.column = column;
    }

    static from({ taskId, title, description, dueDate, column, assignees }: TaskPrisma & { column: Column, assignees: User[] }): Task {
        return new Task(taskId, title, description, dueDate, Column.from(column));
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
  
    setColumn(column: Column): void {
      this.column = column;
    }
  
    getColumn(): Column {
      return this.column;
    }
  }
  