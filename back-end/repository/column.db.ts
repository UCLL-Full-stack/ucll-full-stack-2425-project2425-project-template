import { Column } from '../model/column';
import { Task } from '../model/task';
import database from './database';
import taskDb from './task.db';

const getAllColumns = async (): Promise<Column[]> => {
    try {
        const columnsPrisma = await database.column.findMany({
            include: {
                tasks: { select: { taskId: true } },
                board: { select: { boardId: true } },
            },
        });
        return columnsPrisma.map((columnPrisma) => {
            const taskIds = columnPrisma.tasks?.map(task => task.taskId) || [];
            const column = Column.from(columnPrisma);
            column.setTaskIds(taskIds);
            column.setBoardId(columnPrisma.board.boardId);
            return column;
        });
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getColumnById = async (columnId: string): Promise<Column> => {
    const columnPrisma = await database.column.findUnique({
        where: { columnId },
        include: {
            tasks: { select: { taskId: true } },
            board: { select: { boardId: true } },
        },
    });

    if (!columnPrisma) {
        throw new Error("Column not found");
    }

    const taskIds = columnPrisma.tasks?.map((task) => task.taskId) || [];
    const column = Column.from(columnPrisma);
    column.setTaskIds(taskIds);
    column.setBoardId(columnPrisma.board.boardId);
    return column;
}

const addColumn = async (columnData: {
    columnName: string;
    columnIndex: number;
    boardId: string;
    taskIds?: string[];
}): Promise<Column> => {
    const columnPrisma = await database.column.create({
        data: {
            columnName: columnData.columnName,
            columnIndex: columnData.columnIndex,
            boardId: columnData.boardId,
            tasks: {
                connect: columnData.taskIds?.map(taskId => ({ taskId })),
            },
        },
        include: {
            tasks: { select: { taskId: true } },
            board: { select: { boardId: true } },
        },
    });

    const taskIds = columnPrisma.tasks?.map(task => task.taskId) || [];
    const column = Column.from(columnPrisma);
    column.setTaskIds(taskIds);
    column.setBoardId(columnPrisma.board.boardId);
    return column;
};

const updateColumn = async (columnId: string, columnData: {
    columnName?: string;
    columnIndex?: number;
    taskIds?: string[];
}): Promise<Column> => {
    try {
        const { columnName, columnIndex, taskIds } = columnData;
        const data: any = {};
        if (columnName !== undefined) {
            data.columnName = columnName;
        }
        if (columnIndex !== undefined) {
            data.columnIndex = columnIndex;
        }
        if (taskIds !== undefined) {
            data.tasks = {
                set: taskIds.map(taskId => ({ taskId })),
            };
        }

        const columnPrisma = await database.column.update({
            where: { columnId },
            data,
            include: {
                tasks: { select: { taskId: true } },
                board: { select: { boardId: true } },
            },
        });

        const taskIdsResult = columnPrisma.tasks?.map(task => task.taskId) || [];
        const updatedColumn = Column.from(columnPrisma);
        updatedColumn.setTaskIds(taskIdsResult);
        updatedColumn.setBoardId(columnPrisma.board.boardId);
        return updatedColumn;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllColumns,
    getColumnById,
    addColumn,
    updateColumn,
};
