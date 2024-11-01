import { Board } from '../model/board';
import boardDb from '../repository/board.db';

const getAllBoards = (): Board[] => {
    return boardDb.getAllBoards();
};

const getBoardById = (id: number): Board => {
    const board = boardDb.getBoardById({id});
    if (!board) {
        throw new Error(`Board with id ${id} does not exist.`);
    }
    return board;
}

export default {
    getAllBoards,
    getBoardById,
};