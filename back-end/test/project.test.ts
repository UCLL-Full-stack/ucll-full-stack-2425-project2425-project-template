import { Project } from '../domain/model/project';
import { User } from '../domain/model/user';
import { Task } from '../domain/model/task';
import { Role } from '../types';

describe('Project Model', () => {
    const validProject = {
        project_Id: 1,
        name: 'Project A',
        users: [] as User[],
        tasks: [] as Task[]
    };

    const user1 = new User({ user_Id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 'password123', role: Role.User, projects: [] });
    const user2 = new User({ user_Id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', password: 'password123', role: Role.User, projects: [] });
    const task1 = new Task({ task_Id: 1, name: 'Task 1', description: 'Description 1', due_date: new Date(), users: [] });
    const task2 = new Task({ task_Id: 2, name: 'Task 2', description: 'Description 2', due_date: new Date(), users: [] });

    test("given: existing project, when: adding a new task, then: task is added to project", () => {
        const project = new Project({ project_Id: 1, name: "Project 1", users: [user1], tasks: [task1] });
        project.addTaskToProject(task2);
        expect(project.tasks).toContain(task2);
    });

    test("given: exisiting project, when: adding a new user, then: user is added to project", () => {
        const project = new Project({ project_Id: 1, name: "Project 1", users: [user1], tasks: [task1] });
        project.addUserToProject(user2);
        expect(project.users).toContain(user1);
        expect(project.users).toContain(user2);
    });

    test("given: existing project, when: adding a task that already exists, then: task is not added again", () => {
        const project = new Project({ project_Id: 1, name: "Project 1", users: [user1], tasks: [task1] });
        project.addTaskToProject(task1);
        const taskCount = project.tasks.filter(task => task === task1).length;
        expect(taskCount).toBe(1);
    });

    test("given: existing project, when: adding a user that already exists, then: user is not added again", () => {
        const project = new Project({ project_Id: 1, name: "Project 1", users: [user1], tasks: [task1] });
        project.addUserToProject(user1);
        const userCount = project.users.filter(user => user === user1).length;
        expect(userCount).toBe(1);
    });

    test('should throw an error if name is missing', () => {
        expect(() => {
            new Project({ ...validProject, name: '' });
        }).toThrow('Name is required');
    });

    test('should throw an error if users is not an array', () => {
        expect(() => {
            new Project({ ...validProject, users: [] });
        }).toThrow('Users must be an array');
    });

    test('should throw an error if tasks is not an array', () => {
        expect(() => {
            new Project({ ...validProject, tasks: [] });
        }).toThrow('Tasks must be an array');
    });
});