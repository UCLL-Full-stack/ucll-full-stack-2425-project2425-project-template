const apiUrl = process.env.NEXT_PUBLIC_API_URL;

import { Project } from '@types';

// Function to parse date strings into Date objects
const parseProjectDates = (project: Project): Project => {
    return {
        ...project,
        tasks: project.tasks.map((task: { dueDate: string | number | Date; }) => ({
            ...task,
            dueDate: new Date(task.dueDate) // Parse date string into Date object
        }))
    };
};

// Function to fetch projects and parse dates
export const fetchAndParseProjects = async (): Promise<Project[]> => {
    try {
        const response = await fetch('/projects');
        const data: Project[] = await response.json();
        return data.map(parseProjectDates); // Parse dates for all projects
    } catch (error) {
        console.error("Error fetching projects", error);
        throw error;
    }
};

const getAllProjects = () => {
  return fetch(`${apiUrl}/projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    };
const getProjectById = (projectId: string) => {
  return fetch(`${apiUrl}/projects/${projectId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    })
}
const ProjectService = {
  getAllProjects,
  getProjectById
};

export default ProjectService;