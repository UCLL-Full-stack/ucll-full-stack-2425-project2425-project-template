import React from 'react';
import { User } from '@types';
import styles from '../../styles/Home.module.css';

type UserTableProps = {
    users: Array<User>;
};

const UserTable: React.FC<UserTableProps> = ({ users = [] }: UserTableProps) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Password</th>
                    <th scope="col">Role</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                        <td>{user.role}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
