import { set } from "date-fns";
import { User } from "../model/user";
import { Task } from "../model/task";

const due_date = set(new Date(), { year: 2024, month: 10, date: 25 }); 

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

test("given: valid values for task, when: creating a task, then: task is created with those values", () => {
    const task = new Task({task_Id: 1, name: "Task 1", description: "Task 1 description", due_date, users: [user1]});
    expect(task.name).toBe("Task 1");
    expect(task.description).toBe("Task 1 description");
    expect(task.due_date).toBe(due_date);
    expect(task.users).toEqual([user1]);
})

test("given: existing task, when: adding a new user, then: user is added to task", () => {
    const task = new Task({task_Id: 1, name: "Task 1", description: "Task 1 description", due_date, users: [user1]});
    task.addUserToTaskx(user2);
    expect(task.users).toContain(user1);
    expect(task.users).toContain(user2);
});

test("given: exisisting task: when adding a user that already exists, then: user is not added to task", () => {
    const task = new Task({task_Id: 1, name: "task 1", description: "task 1 description", due_date, users: [user1]})
    task.addUserToTaskx(user1);
    const userCount = task.users.filter(user => user === user1).length;
    expect(userCount).toBe(1);
});