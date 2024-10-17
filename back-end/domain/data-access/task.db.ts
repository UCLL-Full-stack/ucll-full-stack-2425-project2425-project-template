import { Task } from "../model/task";

let current_ID = 1;

const tasks: Task[] = [
    new Task({ task_Id: current_ID++, name: "Task 1", description: "Description 1", due_date: new Date(), users: [] }),
    new Task({ task_Id: current_ID++, name: "Task 2", description: "Description 2", due_date: new Date(), users: [] }),
    new Task({ task_Id: current_ID++, name: "Task 3", description: "Description 3", due_date: new Date(), users: [] }),
    new Task({ task_Id: current_ID++, name: "Task 4", description: "Description 4", due_date: new Date(), users: [] }),
    new Task({ task_Id: current_ID++, name: "Task 5", description: "Description 5", due_date: new Date(), users: [] }),
]

const createTask = ({ name, description, due_date, users }: Task): Task => {
    const task = new Task({ task_Id: Date.now(), name, description, due_date, users: [] });
    tasks.push(task);
    return task;
};

const getAllTasks = (): Task[] => tasks;

const getTaskById = (task_Id: number): Task | undefined => {
    return tasks.find(task => task.task_Id === task_Id);
};

export default {
    createTask,
    getAllTasks,
    getTaskById
};