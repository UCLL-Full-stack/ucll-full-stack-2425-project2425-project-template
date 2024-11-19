import { User } from "./user";
import { Task } from "./task";

export class Project {
  readonly id?: number;
  readonly name: string;
  readonly description?: string;
  readonly startDate?: Date;
  readonly endDate?: Date;
  readonly tasks: Task[] = [];
  readonly users: User[] = [];

  constructor(project: {
    id?: number;
    name: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    tasks?: Task[];
    users?: User[];
  }) {
    this.id = project.id;
    this.name = project.name;
    this.description = project.description;
    this.startDate = project.startDate;
    this.endDate = project.endDate;
    this.tasks = project.tasks || [];
    this.users = project.users || [];
  }

  static from(projectPrisma: any): Project {
    return new Project({
      id: projectPrisma.projectId,
      name: projectPrisma.name,
      description: projectPrisma.description,
      startDate: projectPrisma.startDate,
      endDate: projectPrisma.endDate,
      tasks: projectPrisma.tasks?.map(Task.from) || [],
      users: projectPrisma.users?.map(User.from) || [],
    });
  }

  public getProjectId(): number | undefined {
    return this.id;
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
    return this.id === project.getProjectId() &&
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

  addUsersToProject(user: User) {
    if (!this.users.includes(user))
      this.users.push(user);
}
}