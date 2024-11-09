import { Column } from "./column";
import { User } from "./user";
import { Guild as GuildPrisma, Role as RolePrisma, Board as BoardPrisma, Column as ColumnPrisma, Task as TaskPrisma, User as UserPrisma } from '@prisma/client';

export class Task {
    private taskId: string;
    private title: string;
    private description: string;
    private dueDate: Date;
    private assigneeIds: string[];
    private columnId: string;
  
    constructor(taskId: string, title: string, description: string, dueDate: Date, assigneeIds: string[], column: string) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.assigneeIds = assigneeIds;
        this.columnId = column;
    }

    static from({ taskId, title, description, dueDate, assigneeIds, columnId }: TaskPrisma): Task {
        return new Task(taskId, title, description, dueDate, assigneeIds, columnId);
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
  
    setAssigneeIds(assignees: string[]): void {
      this.assigneeIds = assignees;
    }
  
    getAssigneeIds(): string[] {
      return this.assigneeIds;
    }
  
    setColumnId(columnId: string): void {
      this.columnId = columnId;
    }
  
    getColumnId(): string {
      return this.columnId;
    }
  }
  