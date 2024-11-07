import { Board } from "./board";
import { Task } from "./task";
import { Column as ColumnPrisma } from "@prisma/client";

export class Column {
    private columnId: string;
    private columnName: string;
    private columnIndex: number;
    private tasks: Task[] = [];
    private board: Board;
  
    constructor(columnId: string, columnName: string, columnIndex: number, board: Board) {
      this.columnId = columnId;
      this.columnName = columnName;
      this.columnIndex = columnIndex;
      this.board = board;
    }
  
    static from({ columnId, columnName, columnIndex, board }: ColumnPrisma & { board: Board }): Column {
        return new Column(columnId, columnName, columnIndex, Board.from(board));
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
  
    setBoard(board: Board): void {
      this.board = board;
    }
  
    getBoard(): Board {
      return this.board;
    }
  }
  