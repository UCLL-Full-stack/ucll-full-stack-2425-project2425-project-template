import React, { useState } from 'react';

interface Props {
  projectId: string;
  createTask: (projectId: string, taskName: string) => void;
}

const NewTaskForm: React.FC<Props> = ({ projectId, createTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTask(projectId, taskName);
    setTaskName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="taskName">Task Name:</label>
        <input
          type="text"
          id="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default NewTaskForm;