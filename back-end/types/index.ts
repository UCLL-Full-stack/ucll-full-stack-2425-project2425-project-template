import { Project } from "../model/project";
import { Task } from "../model/task";
import { User } from "../model/user";

export type Role = "ADMIN" | "USER";

export const Roles = {
    Admin: "ADMIN",
    User: "USER",
} as const;

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
    description?: string;
    dueDate?: Date;
    users?: User[];
    completed?: boolean;
};

export { UserInput, ProjectInput, TaskInput };