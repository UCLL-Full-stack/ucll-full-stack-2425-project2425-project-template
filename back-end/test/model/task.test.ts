import { Task } from "../../model/task";
import { User } from "../../model/user";

describe('Task Model', () => {
    let task: Task;
    let user: User;

    beforeEach(() => {
        user = new User('user1', 'Alice', 'alice#1234', []);
        task = new Task('task1', 'Test Task', 'This is a description', new Date(), [user]);
    });

    test('should create a valid task', () => {
        expect(task.getTaskId()).toBe('task1');
        expect(task.getTitle()).toBe('Test Task');
        expect(task.getDescription()).toBe('This is a description');
    });

    test('should throw error if task ID is missing', () => {
        expect(() => {
            new Task('', 'Test Task', 'This is a description', new Date(), []);
        }).toThrow('Task ID is required');
    });

    test('should throw error if title is missing', () => {
        expect(() => {
            new Task('task2', '', 'This is a description', new Date(), []);
        }).toThrow('Task Title is required');
    });

    test('should throw error if description is missing', () => {
        expect(() => {
            new Task('task3', 'Test Task', '', new Date(), []);
        }).toThrow('Task Description is required');
    });

    test('should throw error if due date is missing', () => {
        expect(() => {
            new Task('task4', 'Test Task', 'This is a description', undefined as any, []);
        }).toThrow('Task Due Date is required');
    });

    test('should add an assignee', () => {
        const newUser = new User('user2', 'Bob', 'bob#5678', []);
        task.addAssignee(newUser);
        expect(task.getAssignees().length).toBe(2);
    });

    test('should remove an assignee', () => {
        task.removeAssignee('user1');
        expect(task.getAssignees().length).toBe(0);
    });

    test('should throw error if trying to remove a non-existing assignee', () => {
        expect(() => {
            task.removeAssignee('non-existing-user');
        }).toThrow('Assignee not found');
    });
});
