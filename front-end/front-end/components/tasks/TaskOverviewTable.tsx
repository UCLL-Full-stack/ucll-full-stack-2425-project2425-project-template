import React, { FC } from 'react';
import { Project } from '@types';
import { Task } from '@/types';

type Props = {
  project: Project;
};

const TaskOverviewTable: React.FC<Props> = ({ project }) => {
  return (
    <>
      {project && project.tasks && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Due date</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {project.tasks.map((task: Task, index: number) => {
              const parsedDate = new Date(task.dueDate);
              return (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>{parsedDate ? parsedDate.toLocaleDateString() : 'No due date'}</td>
                  <td>{task.completed ? 'Yes' : 'No'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TaskOverviewTable;