import React from 'react';
import { Project } from '@types';

type Props = {
   project: Project;
};

const ProjectDetails: React.FC<Props> = ({ project }: Props) => {
  return (
    <>
      {project && (
        <table>
          <tr>
            <td>ID:</td>
            <td>{project.id}</td>
          </tr>
          <tr>
            <td>name:</td>
            <td>{project.name}</td>
          </tr>
          <tr>
            <td>users:</td>
            <td>{project.users}</td>
          </tr>
          <tr>
            <td>tasks:</td>
            <td>{project.tasks}</td>
          </tr>
        </table>
      )}
    </>
  );
};

export default ProjectDetails;
