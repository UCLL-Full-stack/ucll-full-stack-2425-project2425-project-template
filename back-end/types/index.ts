import { Project } from "../model/project";
import { Task } from "../model/task";
import { User } from "../model/user";

export type Role = "admin" | "user" | "lecturer";

export const Roles = {
    Admin: "admin" as Role,
    User: "user" as Role,
    Lecturer: "lecturer" as Role
};

type UserInput = {
    user_Id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: Role;
    projects?: Project[];
};

type ProjectInput = {
    project_Id?: number;
    name?: string;
    users?: User[];
    tasks?: Task[];
};

type TaskInput = {
    task_Id?: number;
    name?: string;
    description?: string;
    due_date?: Date;
    users?: User[];
    completed?: boolean;
};

export { UserInput, ProjectInput, TaskInput };