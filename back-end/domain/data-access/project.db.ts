import { Project } from "../model/project";
import { Task } from "../model/task";
import { User } from "../model/user";
import taskDb from "./task.db";
import userDb from "./user.db";

// Import users from userDb
const users: User[] = userDb.getAllUsers();

// Import tasks from taskDb
const tasks: Task[] = taskDb.getAllTasks();

// Hardcoded projects with tasks
const projects: Project[] = [
    new Project({ project_Id: 1, name: "Project 1", users: [users[0]], tasks: [tasks[0]] }),
    new Project({ project_Id: 2, name: "Project 2", users: [users[1]], tasks: [tasks[1]] }),
    new Project({ project_Id: 3, name: "Project 3", users: [users[0], users[1]], tasks: [tasks[0], tasks[1]] }),
    new Project({ project_Id: 4, name: "Project 4", users: [users[0]], tasks: [tasks[2]] }),
    new Project({ project_Id: 5, name: "Project 5", users: [users[0]], tasks: [tasks[3], tasks[4]] }),
];

let currentId = 6;

const createProject = ({ name, users, tasks }: Project): Project => {
    const project = new Project({ project_Id: currentId++, name, users: users || [], tasks: tasks || [] });
    projects.push(project);
    return project;

};

const getAllProjects = (): Project[] => projects;

const getProjectByName = ({ name }: { name: string }): Project | null => {
    const project = projects.find(project => project.name === name);
    return project || null;
};

export default {
    createProject,
    getAllProjects,
    getProjectByName
};