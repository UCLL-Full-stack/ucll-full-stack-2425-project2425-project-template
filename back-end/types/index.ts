import { Project } from "../model/project";
import { Task } from "../model/task";
import { User } from "../model/user";

type Role = "ADMIN" | "USER";


type UserInput = {
    userId?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: Role;
    projects?: Project[];
};

type ProjectInput = {
    projectId?: number;
    name?: string;
    users?: User[];
    tasks?: Task[];
};

type TaskInput = {
    taskId?: number;
    name?: string;
    description?: string | null;
    dueDate?: Date;
    users?: User[];
    completed?: boolean;
};

export { Role, UserInput, ProjectInput, TaskInput };