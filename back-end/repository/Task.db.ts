import { Task } from '../model/Task';

const tasks = [
    new Task({
        id: 1,
        date: new Date('2024-11-01'), 
        time: new Date('2024-11-01T09:00:00'), 
        description: "Cleaning Room 1",
        status: "pending",
        comment: "Make sure the trashbins are empty"
    }),
    
    new Task({
        id: 2,
        date: new Date('2024-11-02'),
        time: new Date('2024-11-02T13:00:00'),
        description: "Check on the projector room to make sure everything is still working",
        status: "completed",
        comment: "Do this extremely carefully"
    }),
];

const getAllTasks = (): Task[] => {
    return tasks;
};

const getTaskById = (id: number): Task | null => {
    const task = tasks.find((task) => task.getId() === id);
    return task || null;
}

export default {
    getAllTasks,
    getTaskById
};
