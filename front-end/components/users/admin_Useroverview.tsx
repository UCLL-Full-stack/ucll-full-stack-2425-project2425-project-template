import React from 'react';
import { UserTable } from '../../types/auth';

type Props = {
  users: Array<UserTable>;
};

const UserOverviewTable: React.FC<Props> = ({ users }: Props) => {
  return (
    <div className="overflow-x-auto">
      {users && (
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th scope="col" className="py-3 px-6 text-left">ID</th>
              <th scope="col" className="py-3 px-6 text-left">UserName</th>
              <th scope="col" className="py-3 px-6 text-left">FirstName</th>
              <th scope="col" className="py-3 px-6 text-left">LastName</th>
              <th scope="col" className="py-3 px-6 text-left">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{user.id}</td>
                <td className="py-3 px-6">{user.username}</td>
                <td className="py-3 px-6">{user.firstname}</td>
                <td className="py-3 px-6">{user.lastname}</td>
                <td className="py-3 px-6">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOverviewTable;