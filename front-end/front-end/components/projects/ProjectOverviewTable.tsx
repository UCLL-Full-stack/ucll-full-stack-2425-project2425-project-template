import React, { useState, useEffect } from 'react';
import { Project } from '@/types';

type Props = {
  projects: Array<Project>;
  selectProject: (project: Project) => void;
}

const ProjectOverviewTable: React.FC<Props> = ({ projects, selectProject}) => {
  

  return (
    <>
      {projects && (
        <table className='table table-hover'>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index} onClick={() => selectProject(project)} role='button'>
              <td>{project.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </>
  );
};

export default ProjectOverviewTable;