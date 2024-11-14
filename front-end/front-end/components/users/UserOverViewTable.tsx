import React, { FC } from 'react';
import { Project } from '@types';
import { User } from '@/types';

type Props = {
  project: Project;
};

const UserOverviewTable: React.FC<Props> = ({ project }) => {
  return (
    <>
      {project && project.users && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {project.users.map((user: User, index: number) => {
              return (
                <tr key={index}>
                  <td>{user.user_Id}</td>
                  <td>{user.firstName + user.lastName}</td>
                  <td>{user.role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserOverviewTable;