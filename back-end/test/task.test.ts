import { set } from "date-fns";
import { User } from "../domain/model/user";
import { Task } from "../domain/model/task";
import { Role } from "../types";

const due_date = set(new Date(), { year: 2024, month: 10, date: 25 }); 

const user1 = new User({
    firstName: "Johan", 
    lastName: "Pieck", 
    email: "johan.pieck@example.com", 
    password: "securepassword", 
    role: Role.Lecturer,
    projects: [] 
});

const user2 = new User({
    firstName: "John", 
    lastName: "Doe", 
    email: "john.doe@example.com",
    password: "passwordsecure",
    role: Role.Admin,
    projects: [] 
});

const user3 = new User({
    firstName: "Jane", 
    lastName: "Smith", 
    email: "jane.smith@example.com",
    password: "anothersecurepassword",
    role: Role.User,
    projects: [] 
});

test("given: valid values for task, when: creating a task, then: task is created with those values", () => {
    const task = new Task({task_Id: 1, name: "Task 1", description: "Task 1 description", due_date, users: [user1]});
    expect(task.name).toBe("Task 1");
    expect(task.description).toBe("Task 1 description");
    expect(task.due_date).toBe(due_date);
    expect(task.users).toEqual([user1]);
});

test("given: existing task, when: adding a new user, then: user is added to task", () => {
    const task = new Task({task_Id: 1, name: "Task 1", description: "Task 1 description", due_date, users: [user1]});
    task.addUserToTask(user2);
    expect(task.users).toContain(user1);
    expect(task.users).toContain(user2);
});

test("given: existing task, when: adding another new user, then: user is added to task", () => {
    const task = new Task({task_Id: 1, name: "Task 1", description: "Task 1 description", due_date, users: [user1]});
    task.addUserToTask(user3);
    expect(task.users).toContain(user1);
    expect(task.users).toContain(user3);
});