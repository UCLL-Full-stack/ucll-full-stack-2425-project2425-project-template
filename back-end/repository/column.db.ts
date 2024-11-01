import { PrismaClient } from '@prisma/client';
import { Column } from '../model/column';
import { Task } from '../model/task';

const prisma = new PrismaClient();

export class ColumnRepository {
    async createColumn(boardId: string, name: string): Promise<Column> {
        try {
            const columnData = await prisma.column.create({
                data: {
                    name,
                    boardId
                }
            });

            return new Column(columnData.id, columnData.name, []);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to create column: ${error.message}`);
            } else {
                throw new Error('Failed to create column: An unknown error occurred');
            }
        }
    }

    async getColumnsByBoardId(boardId: string): Promise<Column[]> {
        try {
            const columns = await prisma.column.findMany({
                where: { boardId },
                include: { tasks: true }
            });

            return columns.map((col: { id: string, name: string, tasks: Task[] }) => new Column(col.id, col.name, []));
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to fetch columns: ${error.message}`);
            } else {
                throw new Error('Failed to fetch columns: An unknown error occurred');
            }
        }
    }
}