import { Project } from "../model/project";
import { Task } from "../model/task";
import { User } from "../model/user";

type Role = "ADMIN" | "USER";


type UserInput = {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: Role;
    projects?: Project[];
};

type ProjectInput = {
    id?: number;
    name?: string;
    users?: User[];
    tasks?: Task[];
};

type EnrollmentInput = {
    project: ProjectInput;
    users: UserInput[];
};

type TaskInput = {
    taskId?: number;
    name?: string;
    description?: string | null;
    dueDate?: Date;
    users?: User[];
    completed?: boolean;
};

export { Role, UserInput, ProjectInput, TaskInput, EnrollmentInput };