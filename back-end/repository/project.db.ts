import database from './database';
import { Project } from '../model/project';

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
  

const getProjectById = async ({id}: {id: number}) => {
  try {
      const project = await database.project.findUnique({
          where: { project_Id: id }, // Ensure this matches the primary key field in your Prisma schema
          include: {
              users: {
                  include: {
                      user: true // Ensure this matches the relation field in your Prisma schema
                  }
              },
              tasks: true
          }
      });

      if (!project) {
          throw new Error(`Project with ID not found`);
      }

      return project;
  } catch (error) {
      console.error(`Error fetching project by ID`, error);
      throw new Error(`Failed to fetch project with ID`);
  }
};

const updateUsersOfProject = async ({
  project,
}: {
  project: Project & { users: { id: number }[] };
}): Promise<Project | null> => {
  try {
      const projectPrisma = await database.project.update({
          where: { project_Id: project.getProjectId() },
          data: {
              users: {
                  connect: project.users.map((user) => ({ id: user.id })),
              },
          },
          include: {
              users: true,
          },
      });
      return projectPrisma ? Project.from(projectPrisma) : null;
  } catch (error) {
      console.error(error);
      throw new Error('Database error. See server log for details.');
  }
};

export default {
    createProject,
    getAllProjects,
    getProjectById,
    updateUsersOfProject,
};