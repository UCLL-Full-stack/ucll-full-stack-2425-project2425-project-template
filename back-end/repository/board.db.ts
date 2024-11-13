import { Board } from '../model/board';
import { Column } from '../model/column';
import userDb from './user.db';
import guildDb from './guild.db';
import columnDb from './column.db';
import { Task } from '../model/task';
import database from './database';
import { PermissionEntry } from '../types';

const getAllBoards = async (): Promise<Board[]> => {
    try {
        const boardPrisma = await database.board.findMany({
            include:{
                columns: {select: {columnId: true}},
                createdByUser: {select: {userId: true}},
                guild: {select: {guildId: true}},
            }
        });
        return boardPrisma.map((boardPrisma) => {
            const columnIds = boardPrisma.columns?.map(column => column.columnId) || [];
            const board = Board.from(boardPrisma);
            board.setColumnIds(columnIds);
            board.setCreatedByUserId(boardPrisma.createdByUser.userId);
            board.setGuildId(boardPrisma.guild.guildId);
            return board;
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getBoardById = async (boardId: string): Promise<Board> => {
    const boardPrisma = await database.board.findUnique({
        where: { boardId },
        include:{
            columns: {select: {columnId: true}},
            createdByUser: {select: {userId: true}},
            guild: {select: {guildId: true}},
        }
    });

    if (!boardPrisma) {
        throw new Error("Board not found");
    }

    const columnIds = boardPrisma.columns?.map((column) => column.columnId) || [];
    const board = Board.from(boardPrisma);
    board.setColumnIds(columnIds);
    board.setCreatedByUserId(boardPrisma.createdByUser.userId);
    board.setGuildId(boardPrisma.guild.guildId);
    return board;
};

const addBoard = async (boardData: {
    boardName: string;
    createdByUserId: string;
    guildId: string;
    columnIds?: string[];
    permissions?: PermissionEntry[];
}): Promise<Board> => {
    try {
        const { boardName, createdByUserId, guildId, columnIds = [], permissions = [] } = boardData;
        const permissionsJson = JSON.stringify(permissions);

        const boardPrisma = await database.board.create({
            data: {
                boardName,
                createdByUser: {connect: {userId: createdByUserId}},
                guild: {connect: {guildId}},
                permissions: permissionsJson,
                columns: {
                    connect: columnIds.map((columnId) => ({ columnId })),
                },
            },
            include:{
                columns: {select: {columnId: true}},
                createdByUser: {select: {userId: true}},
                guild: {select: {guildId: true}},
            }
        });

        const columnIdsResult = boardPrisma.columns?.map((column) => column.columnId) || [];
        const board = Board.from(boardPrisma);
        board.setColumnIds(columnIdsResult);
        board.setCreatedByUserId(boardPrisma.createdByUser.userId);
        board.setGuildId(boardPrisma.guild.guildId);
        return board;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
const updateBoard = async (
    boardId: string,
    updateData: {
        boardName?: string;
        permissions?: PermissionEntry[];
        columnIds?: string[];
    }
  ): Promise<Board> => {
    try {
        const { boardName, permissions, columnIds } = updateData;
        const data: any = {};
    
        if (boardName !== undefined) data.boardName = boardName;
        if (permissions !== undefined) data.permissions = JSON.stringify(permissions);
        if (columnIds !== undefined) {
            data.columns = {
                set: columnIds.map((columnId) => ({ columnId })),
            };
        }
        const updatedBoardPrisma = await database.board.update({
            where: { boardId },
            data,
            include: {
                columns: { select: { columnId: true } },
                createdByUser: { select: { userId: true } },
                guild: { select: { guildId: true } },
            },
        });
        const columnIdsResult = updatedBoardPrisma.columns.map((column) => column.columnId);
        const updatedBoard = Board.from(updatedBoardPrisma);
        updatedBoard.setColumnIds(columnIdsResult);
        updatedBoard.setCreatedByUserId(updatedBoardPrisma.createdByUser.userId);
        updatedBoard.setGuildId(updatedBoardPrisma.guild.guildId);
        return updatedBoard;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllBoards,
    getBoardById,
    addBoard,
    updateBoard,
};
