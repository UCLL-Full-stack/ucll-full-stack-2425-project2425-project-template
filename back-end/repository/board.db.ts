import { Board } from '../model/board';
import { Column } from '../model/column';
import userDb from './user.db';
import guildDb from './guild.db';
import columnDb from './column.db';
import { Task } from '../model/task';

const columns: Column[] = columnDb.getColumns();

const boards: Board[] = [
    // new Board(
    //     "board1-1",
    //     "Project 1",
    //     userDb.getUserById("user1")!,
    //     guildDb.getGuildById("guild1")!,
    //     columns.filter(column => column.getColumnId().endsWith("1-1")),
    //     guildDb.getGuildById("guild1")!.getSettings()
    // ),
    // new Board(
    //     "board2-1",
    //     "Project 2",
    //     userDb.getUserById("user1")!,
    //     guildDb.getGuildById("guild1")!,
    //     columns.filter(column => column.getColumnId().endsWith("2-1")),
    //     guildDb.getGuildById("guild1")!.getSettings()
    // ),
    // new Board(
    //     "board1-2",
    //     "Project 1",
    //     userDb.getUserById("user2")!,
    //     guildDb.getGuildById("guild2")!,
    //     columns.filter(column => column.getColumnId().endsWith("1-2")),
    //     guildDb.getGuildById("guild2")!.getSettings()

    // ),
];

const getBoards = (): Board[] => {
    return boards;
}

const getBoardById = (boardId: string): Board | null => {
    return boards.find(board => board.getBoardId() === boardId) || null;
}

const addBoard = (board: Board): void => {
    boards.push(board);
}

const removeBoard = (boardId: string): void => {
    const boardIndex = boards.findIndex(board => board.getBoardId() === boardId);
    if (boardIndex === -1) throw new Error("Board not found");
    boards.splice(boardIndex, 1);
}

const getColumnsByBoardId = (boardId: string): Column[] => {
    return boards.find(board => board.getBoardId() === boardId)?.getColumns() || [];
}

const addColumnToBoard = (boardId: string, column: Column): void => {
    const board = boards.find(board => board.getBoardId() === boardId);
    if (!board) throw new Error("Board not found");
    if (board.getColumns().find(c => c.getColumnId() === column.getColumnId())) {
        throw new Error("Column already exists in board");
    }
    board.addColumn(column);
}

const removeColumnFromBoard = (boardId: string, columnId: string): void => {
    const board = boards.find(board => board.getBoardId() === boardId);
    if (!board) throw new Error("Board not found");
    if (!board.getColumns().find(c => c.getColumnId() === columnId)) {
        throw new Error("Column not found in board");
    }
    board.removeColumn(columnId);
}

const getAllTasksForBoard = (boardId: string): Task[] => {
    const board = boards.find(board => board.getBoardId() === boardId);
    if (!board) throw new Error("Board not found");
    return board.getColumns().map(column => column.getTasks()).flat();
}


export default {
    getBoards,
    getBoardById,
    addBoard,
    removeBoard,
    getColumnsByBoardId,
    addColumnToBoard,
    removeColumnFromBoard,
    getAllTasksForBoard
};
