import React, { useState } from 'react';
import { User } from '@types';

interface Props {
  users: Array<User>;
  selectUser: (user: User) => void;
}

const UserOverviewTable: React.FC<Props> = ({ users, selectUser }: Props) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    selectUser(user);
  };

  return (
    <>
      {users && users.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Location</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} onClick={() => handleUserClick(user)} role="button">
                <td>{user.fullname}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
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