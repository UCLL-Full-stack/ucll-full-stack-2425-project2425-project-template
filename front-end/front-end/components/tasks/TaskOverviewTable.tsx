import React from 'react';
import { Project } from '@types';

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
            {project.tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
                <td>{task.completed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TaskOverviewTable;