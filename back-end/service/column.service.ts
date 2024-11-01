import { Column } from '../model/column';
import { ColumnRepository } from '../repository/column.db';
import { KanbanPermission } from '../types';

export class ColumnService {
    private columnRepository: ColumnRepository;

    constructor() {
        this.columnRepository = new ColumnRepository();
    }

    async createColumn(boardId: string, name: string, userPermissions: KanbanPermission[]): Promise<Column> {
        // Check if user has permission to create columns
        if (!userPermissions.includes(KanbanPermission.CREATE_COLUMNS) && 
            !userPermissions.includes(KanbanPermission.ADMINISTRATOR)) {
            throw new Error('User does not have permission to create columns');
        }

        try {
            return await this.columnRepository.createColumn(boardId, name);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to create column: ${error.message}`);
            } else {
                throw new Error('Failed to create column: An unknown error occurred');
            }
        }
    }

    async getColumnsByBoardId(boardId: string, userPermissions: KanbanPermission[]): Promise<Column[]> {
        // Check if user has permission to view the board
        if (!userPermissions.includes(KanbanPermission.VIEW_BOARD) && 
            !userPermissions.includes(KanbanPermission.ADMINISTRATOR)) {
            throw new Error('User does not have permission to view this board');
        }

        try {
            return await this.columnRepository.getColumnsByBoardId(boardId);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch columns: ${error.message}`);
            } else {
                throw new Error('Failed to fetch columns: An unknown error occurred');
            }
        }
    }
}