import database from './database';

async function createProject(name: string, description?: string, startDate?: Date, endDate?: Date) {
    try {
      const project = await database.project.create({
        data: {
          name,
          description,
          startDate,
          endDate,
        },
      });
      return project;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
};

const getAllProjects = async () => {
    try {
      return await database.project.findMany({
        include: {
          users: true,
          tasks: true
        }
      });
    } catch (error) {
      console.error("Error fetching all projects:", error);
      throw new Error("Failed to fetch projects");
    }
};
  

const getProjectById = async (project_Id: number) => {
  try {
      const project = await database.project.findUnique({
          where: { project_Id: project_Id },
          include: {
              users: true,
              tasks: true
          }
      });

      if (!project) {
          throw new Error(`Project with ID "${project_Id}" not found`);
      }

      return project;
  } catch (error) {
      console.error(`Error fetching project by ID "${project_Id}":`, error);
      throw new Error(`Failed to fetch project with ID "${project_Id}"`);
  }
};

  

export default {
    createProject,
    getAllProjects,
    getProjectById
};