import { Board } from '../model/board';
import boardDb from '../repository/board.db';
import { PermissionEntry } from '../types';

const getBoardsOfGuild = async (guildId: string): Promise<Board[]> => {
    return await boardDb.getBoardsOfGuild(guildId);
}

const getBoardById = async (boardId: string): Promise<Board> => {
    return await boardDb.getBoardById(boardId);
}

const addBoard = async (boardData: { boardName: string; createdByUserId: string; guildId: string; columnIds?: string[]; permissions?: PermissionEntry[] }): Promise<Board> => {
    return await boardDb.addBoard(boardData);
}

const updateBoard = async (boardId: string, boardData: { boardName?: string; columnIds?: string[]; permissions?: PermissionEntry[] }): Promise<Board> => {
    return await boardDb.updateBoard(boardId, boardData);
}

const deleteBoard = async (boardId: string): Promise<void> => {
    return await boardDb.deleteBoard(boardId);
}

export default {
    getBoardsOfGuild,
    getBoardById,
    addBoard,
    updateBoard,
    deleteBoard
}