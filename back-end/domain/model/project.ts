import { User } from "./user";
import { Task } from "./task";

export class Project {
    project_Id: any;
    readonly name: string;
    readonly users: User[] = [];
    readonly tasks: Task[] = [];

    constructor(project: {
        name: string;
        users: User[];
        tasks: Task[];

    }) {
        this.validate(project);
        this.name = project.name;
        this.users = project.users || [];
        this.tasks = project.tasks || [];
    }

    private validate(project: { name: string; users: User[]; tasks: Task[] }) {
        if (!project.name) {
            throw new Error('Name is required');
        }
        /* if (!Array.isArray(project.users) || project.users.length === 0) {
            throw new Error('At least one user is required');
        }
        if (!Array.isArray(project.tasks) || project.tasks.length === 0) {
            throw new Error('At least one task is required');
        } */
    }


    public getProjectId(): number | undefined {
        return this.project_Id;
    }

    public getName(): string {
        return this.name;
    }

    public getUsers(): User[] {
        return this.users;
    }

    public getTasks(): Task[] {
        return this.tasks;
    }

    equals(project: Project): boolean {
        return this.project_Id === project.getProjectId() &&
            this.name === project.getName() &&
            this.users === project.getUsers() &&
            this.tasks === project.getTasks();
    }

    addTaskToProject(task: Task) {
        if (!this.tasks.includes(task))
            this.tasks.push(task);
    }

    addUserToProject(user: User) {
        if (!this.users.includes(user))
            this.users.push(user);
    }
}