import { Board } from '../model/board';
import { Column } from '../model/column';
import boardDb from '../repository/board.db';
import { PermissionEntry } from '../types';

const getAllBoards = (): Board[] => {
    return boardDb.getBoards();
}

const getBoard = (boardId: string): Board | null => {
    return boardDb.getBoardById(boardId);
}

const createBoard = (board: Board): void => {
    boardDb.addBoard(board);
}

const deleteBoard = (boardId: string): void => {
    boardDb.removeBoard(boardId);
}

const addColumnToBoard = (boardId: string, column: Column): void => {
    boardDb.addColumnToBoard(boardId, column);
}

const removeColumnFromBoard = (boardId: string, columnId: string): void => {
    boardDb.removeColumnFromBoard(boardId, columnId);
}

const getColumnsForBoard = (boardId: string): Column[] => {
    return boardDb.getColumnsByBoardId(boardId);
}

const setPermissionsForBoard = (boardId: string, permissions: PermissionEntry[]) => {
    const board = boardDb.getBoardById(boardId); // Fetch board by ID
    if (!board) {
        throw new Error('Board not found');
    }
    board.setPermissions(permissions); // Assuming this method sets permissions
}

export default {
    getAllBoards,
    getBoard,
    createBoard,
    deleteBoard,
    addColumnToBoard,
    removeColumnFromBoard,
    getColumnsForBoard,
    setPermissionsForBoard
};
