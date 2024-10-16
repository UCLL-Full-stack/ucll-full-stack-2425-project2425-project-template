import { set } from "date-fns";
import { Task } from "../model/task";
import { User } from "../model/user";
import { Project } from "../model/project";

const task1 = new Task({
    task_Id: 1,
    name: "Task 1",
    description: "Task 1 description",
    due_date: set(new Date(), { year: 2024, month: 10, date: 25 }),
    users: []
});

const task2 = new Task({
    task_Id: 2,
    name: "Task 2",
    description: "Task 2 description",
    due_date: set(new Date(), { year: 2024, month: 10, date: 17 }),
    users: []
});

const user1 = new User({
    firstName: "Johan", 
    lastName: "Pieck", 
    email: "johan.pieck@example.com", 
    password: "securepassword", 
    role: "lecturer",
    projects: [] // Add an empty array for projects
});

const user2 = new User({
    firstName: "John", 
    lastName: "Doe", 
    email: "John.doe@example.com",
    password: "passwordsecure",
    role: "admin",
    projects: [] // Add an empty array for projects
});

test("given: valid values for project, when: creating a schedule, then: schedule is crated with those values", () => {
    const project = new Project({ project_Id: 1, name: "Project 1", users: [user1], tasks: [task1] });
    expect(project.name).toBe("Project 1");
    expect(project.users).toContain(user1);
    expect(project.tasks).toContain(task1);
})

test("given: exisiting project, when: adding a new task, then: task is added to project", () => {
    const project = new Project({ project_Id: 1, name: "Project 1", users: [user1], tasks: [task1] });
    project.addTaskToProject(task2);
    expect(project.tasks).toContain(task1);
    expect(project.tasks).toContain(task2);
})

test("given: exisiting project, when: adding a new user, then: user is added to project", () => {
    const project = new Project({ project_Id: 1, name: "Project 1", users: [user1], tasks: [task1] });
    project.addUserToProject(user2);
    expect(project.users).toContain(user1);
    expect(project.users).toContain(user2);
})

test("given: existing project, when: adding a task that already exists, then: task is not added again", () => {
    const project = new Project({ project_Id: 1, name: "Project 1", users: [user1], tasks: [task1] });
    project.addTaskToProject(task1);
    const taskCount = project.tasks.filter(task => task === task1).length;
    expect(taskCount).toBe(1);
})

test("given: existing project, when: adding a user that already exists, then: user is not added again", () => {
    const project = new Project({ project_Id: 1, name: "Project 1", users: [user1], tasks: [task1] });
    project.addUserToProject(user1);
    const userCount = project.users.filter(user => user === user1).length;
    expect(userCount).toBe(1);
})