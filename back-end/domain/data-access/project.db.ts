import { Project } from "../model/project";
let current_ID = 1;

const projects: Project[] = [
    new Project({ project_Id: current_ID++, name: "Project 1", users: [], tasks: [] }),
    new Project({ project_Id: current_ID++, name: "Project 2", users: [], tasks: [] }),
    new Project({ project_Id: current_ID++, name: "Project 3", users: [], tasks: [] }),
    new Project({ project_Id: current_ID++, name: "Project 4", users: [], tasks: [] }),
    new Project({ project_Id: current_ID++, name: "Project 5", users: [], tasks: [] }),
];

const createProject = ({ name, users, tasks }: Project): Project => {
    const project = new Project({ project_Id: Date.now(),  name, users: [], tasks: [] });
    projects.push(project);
    return project;

};

const getAllProjects = (): Project[] => projects;

export default {
    createProject,
    getAllProjects  
};