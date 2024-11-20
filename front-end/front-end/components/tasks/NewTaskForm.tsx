import React, { useState } from 'react';
import TaskService from '@/services/TaskService';

type Props = {
  projectId: string;
  onTaskCreated: (task: any) => void;
  onClose: () => void;
};

const NewTaskForm: React.FC<Props> = ({ projectId, onTaskCreated, onClose }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!taskName) newErrors.taskName = 'Task name is required';
    if (!taskDescription) newErrors.taskDescription = 'Task description is required';
    if (!taskDueDate) {
      newErrors.taskDueDate = 'Task due date is required';
    } else {
      const today = new Date();
      const dueDate = new Date(taskDueDate);
      if (dueDate < today) {
        newErrors.taskDueDate = 'Due date cannot be before today';
      }
    }
    return newErrors;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const newTask = await TaskService.createTask(projectId, taskName, taskDescription, taskDueDate);
      onTaskCreated(newTask);
      setTaskName('');
      setTaskDescription('');
      setTaskDueDate('');
      setErrors({});
      onClose(); // Close the form after successful task creation
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700" htmlFor="taskName">Task Name:</label>
        <input
          type="text"
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.taskName && <p className="text-red-500 text-sm">{errors.taskName}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700" htmlFor="taskDescription">Description:</label>
        <input
          type="text"
          id="taskDescription"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.taskDescription && <p className="text-red-500 text-sm">{errors.taskDescription}</p>}
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700" htmlFor="taskDueDate">Due Date:</label>
        <input
          type="date"
          id="taskDueDate"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.taskDueDate && <p className="text-red-500 text-sm">{errors.taskDueDate}</p>}
      </div>
      <button
        type="submit"
        className="text-white bg-blue-500 px-4 py-2 rounded-md shadow hover:bg-blue-600"
      >
        Create Task
      </button>
    </form>
  );
};

export default NewTaskForm;