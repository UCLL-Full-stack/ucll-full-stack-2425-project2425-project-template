import { PermissionEntry } from "../types";
import { Board } from "./board";
import { Task } from "./task";
import { Guild as GuildPrisma, Role as RolePrisma, Board as BoardPrisma, Column as ColumnPrisma, Task as TaskPrisma, User as UserPrisma } from '@prisma/client';

export class Column {
    private columnId: string;
    private columnName: string;
    private columnIndex: number;
    private taskIds: string[];
    private boardId: string;
  
    constructor(columnId: string, columnName: string, columnIndex: number, tasks: string[], board: string) {
        this.validate(columnName, columnIndex, board);
        this.columnId = columnId;
        this.columnName = columnName;
        this.columnIndex = columnIndex;
        this.taskIds = tasks;
        this.boardId = board;
    }
  
    static from({ columnId, columnName, columnIndex, tasks, boardId }: ColumnPrisma & {tasks: TaskPrisma[]}): Column {
        const taskIds = tasks.map(task => task.taskId);
        return new Column(
            columnId,
            columnName,
            columnIndex,
            taskIds,
            boardId
        );
    }

    validate(columnName: string, columnIndex: number, boardId: string): void {
        if(columnName === undefined || columnName === "") {
            throw new Error("Column name cannot be empty.");
        }
        if(columnIndex === undefined) {
            throw new Error("Column index cannot be empty.");
        }
        if(boardId === undefined || boardId === "") {
            throw new Error("Board ID cannot be empty.");
        }
    }

    getColumnId(): string {
      return this.columnId;
    }
  
    setColumnName(columnName: string): void {
      this.columnName = columnName;
    }
  
    getColumnName(): string {
      return this.columnName;
    }
  
    setColumnIndex(columnIndex: number): void {
      this.columnIndex = columnIndex;
    }
  
    getColumnIndex(): number {
      return this.columnIndex;
    }
  
    setTaskIds(tasks: string[]): void {
      this.taskIds = tasks;
    }
  
    getTaskIds(): string[] {
      return this.taskIds;
    }
  
    setBoardId(boardId: string): void {
      this.boardId = boardId;
    }
  
    getBoardId(): string {
      return this.boardId;
    }
  }
  