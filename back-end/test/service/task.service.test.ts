import { Column } from "../../model/column";
import { Task } from "../../model/task";
import columnDb from "../../repository/column.db";
import taskDb from "../../repository/task.db";
import taskService from "../../service/task.service";


describe('Task Service', () => {
    let task: Task;
    let column: Column;

    beforeEach(() => {
        column = new Column('column1-1', 'Test Column', []);
        task = new Task('task1-1-1', 'Test Task', 'This is a test task', new Date(), []);
        taskDb.addTask(task);
        column.addTask(task);

        taskDb.getTaskById = jest.fn().mockReturnValue(task);
        taskDb.removeTask = jest.fn();
        taskDb.addTask = jest.fn();

        columnDb.getColumnById = jest.fn().mockReturnValue(column);
        columnDb.removeTaskFromColumn = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should update task data', () => {
        const updatedData = {
            title: 'Updated Task Title',
            description: 'Updated Task Description',
            dueDate: new Date().toISOString(),
        };

        jest.spyOn(task, 'setTitle');
        jest.spyOn(task, 'setDescription');
        jest.spyOn(task, 'setDueDate');
        jest.spyOn(task, 'setAssignees');

        taskService.updateTask(task.getTaskId(), updatedData);

        expect(task.setTitle).toHaveBeenCalledWith(updatedData.title);
        expect(task.setDescription).toHaveBeenCalledWith(updatedData.description);
        expect(task.setDueDate).toHaveBeenCalledWith(updatedData.dueDate);

    });

    test('should delete the task', () => {
        taskService.deleteTask(task.getTaskId());
        expect(taskDb.removeTask).toHaveBeenCalledWith(task.getTaskId());

    });
});
