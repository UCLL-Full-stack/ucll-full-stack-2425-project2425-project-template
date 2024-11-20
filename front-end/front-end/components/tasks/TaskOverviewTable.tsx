import React, { FC } from 'react';
import { Project, Task } from '@types';
import TaskService from '@/services/TaskService';

type Props = {
  project: Project & { tasks: Task[] };
  onStatusChange: (taskId: number, newStatus: boolean) => void;
  onTaskRemoved: (taskId: number) => void;
  isEditing: boolean;
};

const TaskOverviewTable: React.FC<Props> = ({ project, onStatusChange, onTaskRemoved, isEditing }) => {
  const handleStatusChange = async (taskId: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;

    try {
      await TaskService.updateTaskStatus(taskId, newStatus);
      onStatusChange(taskId, newStatus);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleRemoveTask = async (taskId: number) => {
    try {
      await TaskService.deleteTask(taskId);
      onTaskRemoved(taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Status</th>
          {isEditing && <th></th>}
        </tr>
      </thead>
      <tbody>
        {project.tasks.map((task: { taskId: number; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; dueDate: string | number | Date; completed: boolean; }) => (
          <tr key={task.taskId}>
            <td>{task.name}</td>
            <td>{task.description}</td>
            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
            <td className={task.completed ? 'text-green-500' : 'text-red-500'}>
              {task.completed ? 'Completed' : 'Not Completed'}
            </td>
            {isEditing && (
                <>
                  <td>
                    <button
                      onClick={() => handleStatusChange(task.taskId, task.completed)}
                      className="btn btn-primary text-white bg-blue-500 px-2 py-2 rounded-md shadow hover:bg-blue-600"
                    >
                      {task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleRemoveTask(task.taskId)}
                      className="btn btn-danger text-white bg-red-500 px-2 py-2 rounded-md shadow hover:bg-red-600"
                    >
                      Remove Task
                    </button>
                  </td>
                </>
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskOverviewTable;