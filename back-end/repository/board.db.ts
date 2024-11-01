
import { PrismaClient } from '@prisma/client';
import { Board } from '../model/board';
import { User } from '../model/user';
import { Guild } from '../model/guild';
import { Column } from '../model/column';
import { PermissionEntry } from '../types';

const prisma = new PrismaClient();

export class BoardRepository {
    async createBoard(
        boardName: string,
        createdByUser: User,
        guild: Guild,
        defaultColumns: Column[],
        permissions: PermissionEntry[]
    ): Promise<Board> {
        try {
            const boardData = await prisma.board.create({
                data: {
                    name: boardName,
                    createdByUserId: createdByUser.getUserId(),
                    guildId: guild.getGuildId(),
                    permissions: JSON.stringify(permissions),
                    columns: {
                        create: defaultColumns.map(col => ({
                            name: col.getColumnName()
                        }))
                    }
                },
                include: {
                    columns: true,
                    createdByUser: true,
                    guild: true
                }
            });

            // Map the Prisma data back to our domain model
            const columns = boardData.columns.map((col: { id: string, name: string }) => 
                new Column(col.id, col.name, [])
            );

            return new Board(
                boardData.id,
                boardData.name,
                createdByUser,
                guild,
                columns,
                permissions
            );
        } catch (error) {
            if (error instanceof Error) {throw new Error(`Failed to create board: ${error.message}`);
            }else {throw new Error('Failed to create board: An unknown error occurred');}
        }
    }

    async getBoardsByGuildId(guildId: string): Promise<Board[]> {
        try {
            const boardsData = await prisma.board.findMany({
                where: { guildId },
                include: {
                    columns: true,
                    createdByUser: true,
                    guild: true
                }
            });

            return boardsData.map((boardData: any) => {
                const columns = boardData.columns.map((col: { id: string, name: string }) => 
                    new Column(col.id, col.name, [])
                );

                const user = new User(
                    boardData.createdByUser.id,
                    boardData.createdByUser.username,
                    boardData.createdByUser.userTag,
                    []
                );

                if (!boardData.guild) {
                    throw new Error('Guild data is missing for board');
                }

                const guild = new Guild(
                    boardData.guild.id,
                    boardData.guild.name,
                    JSON.parse(boardData.guild.permissions),
                    JSON.parse(boardData.guild.settings),
                    []
                );

                return new Board(
                    boardData.id,
                    boardData.name,
                    user,
                    guild,
                    columns,
                    JSON.parse(boardData.permissions)
                );
            });
        } catch (error) {
            if (error instanceof Error) {throw new Error(`Failed to create board: ${error.message}`);
            }else {throw new Error('Failed to create board: An unknown error occurred');}
        }
    }
}