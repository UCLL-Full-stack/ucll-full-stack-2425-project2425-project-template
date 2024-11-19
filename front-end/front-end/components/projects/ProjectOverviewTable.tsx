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
                  <button className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center ml-10 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={() => selectProject(project)}>Select</button>
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