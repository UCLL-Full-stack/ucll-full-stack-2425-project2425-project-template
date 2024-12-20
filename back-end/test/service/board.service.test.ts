import { Board } from "../../model/board";
import { Column } from "../../model/column";
import { Guild } from "../../model/guild";
import { User } from "../../model/user";
import boardDb from "../../repository/board.db";
import boardService from "../../service/board.service";
import { KanbanPermission } from "../../types";


jest.mock('../../repository/board.db');

describe('BoardService', () => {
    let board: Board;
    let user: User;
    let guild: Guild;
    let column: Column;

    beforeEach(() => {
        user = new User('user1', 'Alice', 'alice#1234', []);
        guild = new Guild('guild1', 'Guild 1', [], [], []);
        column = new Column('column1-1-1', 'To Do', []);
        board = new Board('board1-1', 'Project 1', user, guild, [column], [
            { identifier: 'user1', kanbanPermission: [KanbanPermission.ADMINISTRATOR]}
        ]);
        boardDb.addBoard = jest.fn();
        boardDb.addBoard(board);
        boardDb.getBoards = jest.fn().mockReturnValue([board]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should create a new board', () => {
        const boardData = {
            boardName: 'New Board',
            createdByUser: 'user1',
            guild: 'guild1',
            columns: [{ columnName: 'To Do' }],
            permissions: []
        };
        boardService.createBoard(boardData);
        expect(boardDb.addBoard).toHaveBeenCalled()
    });

    test('should throw error when creating a board with invalid user', () => {
        const boardData = {
            boardName: 'New Board',
            createdByUser: 'invalidUser',
            guild: 'guild1',
            columns: [{ columnName: 'To Do' }],
            permissions: []
        };
        expect(() => boardService.createBoard(boardData)).toThrow('User does not exist.');
    });

});
