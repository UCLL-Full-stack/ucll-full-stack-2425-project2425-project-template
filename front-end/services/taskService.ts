
const getAllTasks = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
  };
  

  const getTaskById = async (taskId: number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
  };
  



  
  const TaskService = {
    getAllTasks,
    getTaskById
  };
  
  export default TaskService;
  