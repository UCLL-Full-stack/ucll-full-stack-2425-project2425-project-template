import React from 'react';
import { User } from '@types';

interface Props {
  users: Array<User>;
  selectUser: (user: User) => void;
}

const UserOverviewTable: React.FC<Props> = ({ users, selectUser }: Props) => {
  return (
    <>
      {users && users.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} onClick={() => selectUser(user)} role="button">
                <td>{user.name} {user.surname}</td>
                <td>{user.email}</td>
                <td>{user.permission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Users available.</p>
      )}
    </>
  );
};

export default UserOverviewTable;