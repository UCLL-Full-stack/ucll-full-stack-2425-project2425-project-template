// src/service/board.service.ts
import { Board } from '../model/board';
import { Column } from '../model/column';
import { User } from '../model/user';
import { Guild } from '../model/guild';
import { BoardRepository } from '../repository/board.db';
import { KanbanPermission, PermissionEntry } from '../types';

export class BoardService {
    private boardRepository: BoardRepository;

    constructor() {
        this.boardRepository = new BoardRepository();
    }

    async createBoard(
        boardName: string,
        user: User,
        guild: Guild
    ): Promise<Board> {
        // Validate user permissions
        if (!this.userCanCreateBoard(user, guild)) {
            throw new Error('User does not have permission to create a board');
        }

        // Create default columns
        const defaultColumns = [
            new Column(crypto.randomUUID(), 'To Do', []),
            new Column(crypto.randomUUID(), 'In Progress', []),
            new Column(crypto.randomUUID(), 'Done', [])
        ];

        // Set default board permissions
        const defaultPermissions: PermissionEntry[] = [
            {
                identifier: guild.getGuildId(),
                kanbanPermission: KanbanPermission.VIEW_BOARD
            },
            {
                identifier: user.getUserId(),
                kanbanPermission: KanbanPermission.ADMINISTRATOR
            }
        ];

        try {
            const board = await this.boardRepository.createBoard(
                boardName,
                user,
                guild,
                defaultColumns,
                defaultPermissions
            );

            return board;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to create board: ${error.message}`);
            } else {
                throw new Error('Failed to create board: An unknown error occurred');
            }
        }
    }

    private userCanCreateBoard(user: User, guild: Guild): boolean {
        // Check if user has the CREATE_BOARD permission
        const userPermissions = guild.getPermissions();
        return userPermissions.some(perm => 
            perm.kanbanPermission === KanbanPermission.CREATE_BOARD ||
            perm.kanbanPermission === KanbanPermission.ADMINISTRATOR
        );
    }

    async getBoardsByGuild(guildId: string): Promise<Board[]> {
        try {
            return await this.boardRepository.getBoardsByGuildId(guildId);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to create board: ${error.message}`);
            } else {
                throw new Error('Failed to create board: An unknown error occurred');
            }
        }
    }
}