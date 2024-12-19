import { Column } from "./column";
import { User } from "./user";
import { Guild as GuildPrisma, Role as RolePrisma, Board as BoardPrisma, Column as ColumnPrisma, Task as TaskPrisma, User as UserPrisma } from '@prisma/client';

export class Task {
  private taskId: string;
  private title: string;
  private description: string;
  private taskIndex: number;
  private dueDate: Date;
  private assigneeIds: string[];
  private columnId: string;

  constructor(
      taskId: string, 
      title: string, 
      description: string, 
      taskIndex: number, 
      dueDate: Date, 
      assigneeIds: string[], 
      columnId: string
  ) {
      this.validate(title, columnId);
      this.taskId = taskId;
      this.title = title;
      this.description = description;
      this.taskIndex = taskIndex;
      this.dueDate = dueDate;
      this.assigneeIds = assigneeIds;
      this.columnId = columnId;
  }

  static from(data: TaskPrisma & {
      assignees: { userId: string }[];
      column: { columnId: string };
  }): Task {
      if (!data.taskIndex) {
          throw new Error("Task index is required");
      }
      return new Task(
          data.taskId,
          data.title,
          data.description,
          data.taskIndex,
          data.dueDate,
          data.assignees.map(assignee => assignee.userId),
          data.column.columnId
      );
  }
  validate(title: string, columnId: string): void {
      if(title === undefined || title === "") {
          throw new Error("Task title cannot be empty.");
      }
      if(columnId === undefined || columnId === "") {
          throw new Error("Column ID cannot be empty.");
      }
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

  getTaskIndex(): number {
      return this.taskIndex;
  }

  setTaskIndex(taskIndex: number): void {
      this.taskIndex = taskIndex;
  }
}
  