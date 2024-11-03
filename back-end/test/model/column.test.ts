import { Column } from "../../model/column";
import { Task } from "../../model/task";


describe('Column Model', () => {
    let column: Column;

    beforeEach(() => {
        column = new Column('column1-1', 'To Do', []);
    });

    test('should create a valid column', () => {
        expect(column.getColumnId()).toBe('column1-1');
        expect(column.getColumnName()).toBe('To Do');
    });

    test('should add a task to the column', () => {
        const task = new Task('task1-1-1', 'Test Task', 'Description', new Date(), []);
        column.addTask(task);
        expect(column.getTasks().length).toBe(1);
    });

    test('should remove a task from the column', () => {
        const task = new Task('task1-1-1', 'Test Task', 'Description', new Date(), []);
        column.addTask(task);
        column.removeTask('task1-1-1');
        expect(column.getTasks().length).toBe(0);
    });

    test('should throw error if trying to remove a non-existing task', () => {
        expect(() => {
            column.removeTask('non-existing-task');
        }).toThrow('Task not found');
    });
});
