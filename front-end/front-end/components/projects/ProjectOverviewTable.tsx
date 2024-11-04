import React from 'react';
import { Project } from '@/types';

type Props = {
  projects: Array<Project>;
  selectProject: (project: Project) => void;
};

const ProjectOverviewTable: React.FC<Props> = ({ projects, selectProject }) => {
  return (
    <>
      {projects && (
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td>{project.name}</td>
                <td>
                  <button onClick={() => selectProject(project)}>Select</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ProjectOverviewTable;