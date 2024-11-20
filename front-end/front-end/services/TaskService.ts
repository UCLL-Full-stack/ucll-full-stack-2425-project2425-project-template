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


const updateTaskStatus = async (taskId: number, completed: boolean) => {
  try {
    const response = await fetch(`${apiUrl}/projects/tasks/${taskId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating task status:', error);
  }
};

const TaskService = {
  createTask,
  updateTaskStatus,
};

export default TaskService;