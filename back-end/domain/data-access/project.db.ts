import { Project } from "../model/project";
let current_ID = 1;

const projects: Project[] = [
    new Project({ name: "Project 1", users: [], tasks: [] }),
    new Project({ name: "Project 2", users: [], tasks: [] }),
    new Project({ name: "Project 3", users: [], tasks: [] }),
    new Project({ name: "Project 4", users: [], tasks: [] }),
    new Project({ name: "Project 5", users: [], tasks: [] }),
];

const createProject = ({ name, users, tasks }: Project): Project => {
    const project = new Project({  name, users: [], tasks: [] });
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