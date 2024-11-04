const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const createTask = (projectId: string, taskName: string) => {
    return fetch(`${apiUrl}/projects/${projectId}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: taskName }),
    });
  };
  
  const TaskService = {
    createTask,
  };
  
  export default TaskService;