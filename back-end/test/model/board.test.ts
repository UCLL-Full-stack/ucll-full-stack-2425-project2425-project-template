import { Board } from "../../model/board";
import { Column } from "../../model/column";
import { Guild } from "../../model/guild";
import { User } from "../../model/user";
import { DiscordPermission, KanbanPermission } from "../../types";


describe('Board Model', () => {
    let board: Board;
    let user: User;
    let guild: Guild;
    let columns: Column[];

    beforeEach(() => {
        guild = new Guild('guild1', 'Guild 1', [
            { identifier: DiscordPermission.ADMINISTRATOR, kanbanPermission: [KanbanPermission.ADMINISTRATOR] },
        ], [], []);
        user = new User('user1', 'Alice', 'alice#1234', [guild]);
        columns = [new Column('column1-1', 'To Do', []), new Column('column1-2', 'In Progress', [])];
        board = new Board('board1', 'Project 1', user, guild, columns, [
            { identifier: DiscordPermission.ADMINISTRATOR, kanbanPermission: [KanbanPermission.ADMINISTRATOR] },
        ]);
    });

    test('should create a valid board', () => {
        expect(board.getBoardId()).toBe('board1');
        expect(board.getBoardName()).toBe('Project 1');
    });

    test('should throw error for invalid board name', () => {
        expect(() => {
            new Board('board1', '  ', user, guild, columns, []);
        }).toThrow('Board Name is required');
    });

    test('should throw error if no columns are provided', () => {
        expect(() => {
            new Board('board2', 'Project 2', user, guild, [], []);
        }).toThrow('Board must have at least one column');
    });

    test('should throw error if permissions are not set', () => {
        expect(() => {
            new Board('board3', 'Project 3', user, guild, columns, []);
        }).toThrow('Board must have permission settings');
    });

    test('should add a column to the board', () => {
        const newColumn = new Column('column1-3', 'Done', []);
        board.addColumn(newColumn);
        expect(board.getColumns().length).toBe(3);
    });

    test('should throw error when trying to remove the last column', () => {
        board.removeColumn('column1-1');
        expect(() => {
            board.removeColumn('column1-2');
        }).toThrow('Cannot remove the last column');
    });

    test('should throw error when trying to remove a non-existing column', () => {
        expect(() => {
            board.removeColumn('non-existing-column');
        }).toThrow('Column not found');
    });
});
