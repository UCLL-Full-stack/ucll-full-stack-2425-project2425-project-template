import { Board } from '../model/board';
import { Column } from '../model/column';
import boardDb from '../repository/board.db';

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

export default {
    getAllBoards,
    getBoard,
    createBoard,
    deleteBoard,
    addColumnToBoard,
    removeColumnFromBoard,
    getColumnsForBoard,
};
