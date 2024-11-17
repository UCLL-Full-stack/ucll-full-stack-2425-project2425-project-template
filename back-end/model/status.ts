import { Task } from "./task";
import {
    Status as StatusPrisma,
    Task as TaskPrisma
} from '@prisma/client'

export class Status {
    private id?: number;
    private name: string;
    private tasks: Task[];

    constructor(user: {
        id?: number;
        name: string;
        tasks?: Task[];
    }) {
        this.id = user.id;
        this.name = user.name;
        this.tasks = user.tasks || [];
    }

    // getters
    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getTasks(): Task[] {
        return this.tasks;
    }

    // setters
    setName(name: string): void {
        this.name = name;
    }

    setTasks(tasks: Task[]): void {
        this.tasks = tasks;
    }

    // methods
    addTask(task: Task): void {
        if (!this.tasks.some(t => t.equals(task))) {
            this.tasks.push(task);
        }
    }
    equals(otherStatus: Status): boolean {
        return (
            this.name === otherStatus.getName() &&
            this.tasks.every((task, index) => {
                return task.equals(otherStatus.getTasks()[index]);
            })
        );
    }

    static from({
        id,
        name,
        tasks
    }: StatusPrisma & { tasks: TaskPrisma[] }): Status {
        return new Status({
            id,
            name,
            tasks: tasks.map((task) => Task.from(task))
        })
    }
}
