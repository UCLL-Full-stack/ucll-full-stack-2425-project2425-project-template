import { Board } from '../model/board';
import { Column } from '../model/column';
import { Guild } from '../model/guild';
import { Task } from '../model/task';
import { User } from '../model/user';
import boardDb from '../repository/board.db';
import columnDb from '../repository/column.db';
import guildDb from '../repository/guild.db';
import userDb from '../repository/user.db';
import { PermissionEntry } from '../types';
import { validateBoard, validateColumn, validatePermissions } from '../util/validators';

const getAllBoards = (): Board[] => {
    return boardDb.getBoards();
}

const getBoard = (boardId: string): Board | null => {
    return boardDb.getBoardById(boardId);
}

const createBoard = (boardData: any): void => {
    const errors = validateBoard(boardData);
    if (errors.length > 0) {
        throw new Error(errors.join(', '));
    }
    const { boardName, createdByUser, guild, columns, permissions } = boardData;
    let user: User | null;
    if (typeof createdByUser === 'string') {
        user = userDb.getUserById(createdByUser);
    } else if (typeof createdByUser === 'object') {
        user = userDb.getUserById(createdByUser.userId);
    }

    let guildData: Guild | null;
    if (typeof guild === 'string') {
        guildData = guildDb.getGuildById(guild);
    } else if (typeof guild === 'object') {
        guildData = guildDb.getGuildById(guild.guildId);
    }

    const guildIdNumber = parseInt(guildData!.getGuildId().replace(/\D/g, ''), 10);
    const existingBoards = boardDb.getBoards().filter(board => board.getBoardId().endsWith(guildIdNumber.toString()));
    const boardIdNumber = existingBoards.length + 1
    const boardId = `board${boardIdNumber}-${guildIdNumber}`;

    let boardColumns: Column[] = [];
    if (columns && columns.length > 0) {
        const columnsData = columns.map((column: {columnName: string}, index: number) => {
            const columnId = `column${index+1}-${boardIdNumber}-${guildIdNumber}`;
            return {
                columnId,
                columnName: column.columnName,
                tasks: []
            };
        });
        columnsData.forEach((column: { columnId: string; columnName: string; tasks: Task[]; }) => {
            columnDb.addColumn(column);
        });
        boardColumns = columnsData.map((column: { columnId: string; }) => columnDb.getColumnById(column.columnId)!);
    } else{
        boardColumns = createDefaultColumns(boardIdNumber, guildIdNumber);
    }

    let boardPermissions: PermissionEntry[] = [];
    if (permissions && permissions.length > 0) {
        boardPermissions = permissions;
    } else {
        boardPermissions = guildData!.getSettings();
    }

    const board = new Board(boardId, boardName, user!, guildData!, boardColumns, boardPermissions);
    boardDb.addBoard(board);

}

const deleteBoard = (boardId: string): void => {
    boardDb.removeBoard(boardId);
}

const addColumnToBoard = (boardId: string, columnData: any): void => {
    const errors = validateColumn(columnData);
    if (errors.length > 0) {
        throw new Error(errors.join(', '));
    }
    const { columnName } = columnData;
    const columnId = `column${boardDb.getColumnsByBoardId(boardId).length + 1}-${boardId.slice(5)}`;
    columnDb.addColumn({ columnId, columnName, tasks: [] as Task[] });
    const column = columnDb.getColumnById(columnId)!;
    boardDb.addColumnToBoard(boardId, column);
}

const removeColumnFromBoard = (boardId: string, columnId: string): void => {
    boardDb.removeColumnFromBoard(boardId, columnId);
}

const getColumnsForBoard = (boardId: string): Column[] => {
    return boardDb.getColumnsByBoardId(boardId);
}

const setPermissionsForBoard = (boardId: string, permissions: any) => {
    const errors = validatePermissions(permissions);
    if (errors.length > 0) {
        throw new Error(errors.join(', '));
    }
    const board = boardDb.getBoardById(boardId);
    if (!board) {
        throw new Error('Board not found');
    }
    board.setPermissions(permissions);
}


const createDefaultColumns = (boardId: number, guildIdNumber: number): Column[] => {
    const defaultColumns = [
        { columnName: "To Do", tasks: [] as Task[] },
        { columnName: "In Progress", tasks: [] as Task[] },
        { columnName: "Done", tasks: [] as Task[] }
    ];
    
    const columnsWithId = defaultColumns.map((column, index) => {
        const columnId = `column${index + 1}-${boardId}-${guildIdNumber}`;
        return {
            columnId,
            columnName: column.columnName,
            tasks: column.tasks
        };
    });

    // create columns in database
    columnsWithId.forEach(column => {
        columnDb.addColumn(column);
    });
    const columns = columnsWithId.map(column => columnDb.getColumnById(column.columnId)!);
    return columns;
};


export default {
    getAllBoards,
    getBoard,
    createBoard,
    deleteBoard,
    addColumnToBoard,
    removeColumnFromBoard,
    getColumnsForBoard,
    setPermissionsForBoard
};
