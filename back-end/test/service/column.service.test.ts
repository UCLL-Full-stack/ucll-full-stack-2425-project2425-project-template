import { Board } from "../../model/board";
import { Column } from "../../model/column";
import { Task } from "../../model/task";
import boardDb from "../../repository/board.db";
import columnDb from "../../repository/column.db";
import guildDb from "../../repository/guild.db";
import taskDb from "../../repository/task.db";
import userDb from "../../repository/user.db";
import columnService from "../../service/column.service";
import { KanbanPermission } from "../../types";


describe('Column Service', () => {
    let column: Column;
    let column2: Column;
    let task: Task;
    let board: Board;

    beforeEach(() => {
        column = new Column('column1-1', 'To Do', []);
        column2 = new Column('column2-1', 'In Progress', []);
        task = new Task('task1-1-1', 'Sample Task', 'This is a task description', new Date(), []);
        board = new Board('board1-1', 'Project 1', userDb.getUserById('user1')!, guildDb.getGuildById('guild1')!, [column, column2], [
            { identifier: 'user1', kanbanPermission: [KanbanPermission.ADMINISTRATOR]}
        ]);
        columnDb.getColumnById = jest.fn().mockReturnValue(column);
        columnDb.removeColumn = jest.fn();
        boardDb.getBoardById = jest.fn().mockReturnValue(board);
        boardDb.removeBoard = jest.fn();
        boardDb.getAllTasksForBoard = jest.fn().mockReturnValue([]);
        taskDb.getTaskById = jest.fn().mockReturnValue(task);
        taskDb.addTask = jest.fn();
        columnDb.addTaskToColumn = jest.fn();
        columnDb.removeTaskFromColumn = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addTaskToColumn', () => {
        test('should add a task to a column', () => {
            const taskData = {
                title: 'New Task',
                description: 'Description for new task',
                dueDate: '2024-11-03T02:05:24.723Z',
                assignees: []
            };

            columnService.addTaskToColumn(column.getColumnId(), taskData);

            expect(taskDb.addTask).toHaveBeenCalled();
            expect(columnDb.addTaskToColumn).toHaveBeenCalled();
        });

        test('should throw an error if column does not exist', () => {
            columnDb.getColumnById = jest.fn().mockReturnValue(null);

            expect(() => {
                columnService.addTaskToColumn('invalid-column-id', {});
            }).toThrow('Column not found');
        });
    });


    test('should update the column name', () => {
        const updatedColumnData = { columnName: 'Updated Column Name' };
        const setColumnNameSpy = jest.spyOn(column, 'setColumnName');

        columnService.updateColumn(column.getColumnId(), updatedColumnData);

        expect(setColumnNameSpy).toHaveBeenCalledWith(updatedColumnData.columnName);
    });

    test('should delete the column', () => {
        columnDb.getColumnById = jest.fn().mockReturnValue(column);
        columnService.deleteColumn(column.getColumnId());

        expect(columnDb.removeColumn).toHaveBeenCalledWith(column.getColumnId());
    });

    test('should throw an error if the column does not exist', () => {
        columnDb.getColumnById = jest.fn().mockReturnValue(null);

        expect(() => {
            columnService.deleteColumn('invalid-column-id');
        }).toThrow('Column not found');
    });
});
