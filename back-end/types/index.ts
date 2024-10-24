import { Project } from "../domain/model/project";
import { Task } from "../domain/model/task";
import { User } from "../domain/model/user";

enum Role {
    Admin = 'admin',
    Lecturer = 'lecturer',
    User = 'user'
}

export { Role };

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
    project_Id?: any;
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
};

export { UserInput, ProjectInput, TaskInput };