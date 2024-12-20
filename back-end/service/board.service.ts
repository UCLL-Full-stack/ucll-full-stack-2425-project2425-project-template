import { Board } from '../model/board';
import boardDb from '../repository/board.db';
import { CreateBoardInput, PermissionEntry } from '../types';
import columnService from './column.service';
import guildService from './guild.service';

const getBoardsOfGuild = async (guildId: string): Promise<Board[]> => {
    return await boardDb.getBoardsOfGuild(guildId);
}

const getBoardById = async (boardId: string): Promise<Board> => {
    return await boardDb.getBoardById(boardId);
}

const addBoard = async (boardData: CreateBoardInput): Promise<Board> => {
    const { boardName, createdByUserId, guildId, columns = [], permissions = [] } = boardData;
    let updatedPermissions = permissions;
    if(permissions.length === 0) {
        const guildPermissions = await guildService.getGuildPermissions(guildId);
        updatedPermissions = guildPermissions;
    }
    const updatedBoardData = {
        ...boardData,
        permissions: updatedPermissions
    };
    const createdBoard = await boardDb.addBoard(updatedBoardData);
    const columnIds: string[] = [];
    for(const column of columns) {
        const createdColumn = await columnService.addColumn({ columnName: column, boardId: createdBoard.getBoardId(), columnIndex: columns.indexOf(column) });
        columnIds.push(createdColumn.getColumnId());
    }
    await boardDb.updateBoard(createdBoard.getBoardId(), { columnIds });
    return boardDb.getBoardById(createdBoard.getBoardId());
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