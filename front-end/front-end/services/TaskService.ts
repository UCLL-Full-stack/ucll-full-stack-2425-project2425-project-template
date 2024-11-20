const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const createTask = async (projectId: string, taskName: string, taskDescription: string, taskDueDate: string) => {
  const response = await fetch(`${apiUrl}/projects/${projectId}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: taskName,
      description: taskDescription,
      dueDate: taskDueDate,
    }),
  });

  if (!response.ok) {
    throw new Error('Error creating task');
  }

  return response.json();
};

const TaskService = {
  createTask,
};

export default TaskService;