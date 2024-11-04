const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAllProjects = () => {
  return fetch(`${apiUrl}/projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    };
const getProjectById = (projectId: string) => {
  return fetch(`${apiUrl}/lecturers/${projectId}`, {
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