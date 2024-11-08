import { PermissionEntry } from "../types";
import { Board } from "./board";
import { Task } from "./task";
import { Column as ColumnPrisma, Board as BoardPrisma } from "@prisma/client";

export class Column {
    private columnId: string;
    private columnName: string;
    private columnIndex: number;
    private tasks: Task[] = [];
    private boardId: string;
  
    constructor(columnId: string, columnName: string, columnIndex: number, board: string) {
      this.columnId = columnId;
      this.columnName = columnName;
      this.columnIndex = columnIndex;
      this.boardId = board;
    }
  
    static from({ columnId, columnName, columnIndex, boardId }: ColumnPrisma): Column {
        return new Column(columnId, columnName, columnIndex, boardId);
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
  
    setTasks(tasks: Task[]): void {
      this.tasks = tasks;
    }
  
    getTasks(): Task[] {
      return this.tasks;
    }
  
    setBoardId(boardId: string): void {
      this.boardId = boardId;
    }
  
    getBoardId(): string {
      return this.boardId;
    }
  }
  