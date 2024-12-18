import React, { useState } from 'react';
import { StatusMessage, User } from '@types';
import styles from '../../styles/Home.module.css';
import { mutate } from 'swr';
import UserService from '@services/UserService';
import classNames from 'classnames';

type UserTableProps = {
    users: Array<User>;
};

const UserTable: React.FC<UserTableProps> = ({ users = [] }: UserTableProps) => {
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

    const deleteUser = async (username: string) => {
        const response = await UserService.deleteUser(username);
        if (response.status === 200) {
            setStatusMessages([{ message: 'User deleted successfully', type: 'success' }]);
            mutate('users');
            console.log('User deleted successfully');
        } else {
            const errorResponse = await response.json();
            const errorMessage = errorResponse.message || response.statusText;
            setStatusMessages([{ message: `${errorMessage}`, type: 'error' }]);
        }
    };

    return (
        <>
            {statusMessages && (
                <div className="row">
                    <ul className="mx-auto mb-3 list-none text-center">
                        {statusMessages.map(({ message, type }, index) => (
                            <li
                                key={index}
                                className={classNames({
                                    'text-red-800': type === 'error',
                                    'text-blue-800': type === 'success',
                                })}
                            >
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Password</th>
                            <th scope="col">Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button
                                        onClick={() => deleteUser(user.username)}
                                        className="text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-10 py-2.5"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UserTable;
