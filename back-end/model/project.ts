import { User } from "./user";
import { Task } from "./task";

export class Project {
    project_Id: any;
    private name: string;
    private users: User[] = [];
    private tasks: Task[] = [];

    constructor(project: {
        projectId: any;
        name: string;
        users: User[];
        tasks: Task[];

    }) {
        this.project_Id = project.projectId;
        this.name = project.name;
        this.users = project.users;
        this.tasks = project.tasks;
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
}