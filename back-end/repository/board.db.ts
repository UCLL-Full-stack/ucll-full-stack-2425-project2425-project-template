import { Board } from '../model/board';

const boards: Board[] = [];

const getAllBoards = (): Board[] => {
    return boards;
};

const getBoardById = ({ id }: { id: number }): Board | null => {
    const board = boards.find((board) => board.getId() === id);
    if (!board) {
        return null;
    }
    return board;
}

export default {
    getAllBoards,
    getBoardById,
};
