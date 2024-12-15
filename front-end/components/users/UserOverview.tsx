import React from 'react';
import { UserInput } from "@types";
import styles from '@styles/home.module.css';

type Props = {
    usersData: UserInput[];
};

const UserOverview: React.FC<Props> = ({ usersData }: Props) => {

    return (
        <div className="overflow-x-auto mt-5 pb-5">
            <table className={styles.usersTable}>
                <thead>
                    <tr>
                        <th className={styles.usersTableth1}>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th className={styles.usersTableth2}>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {usersData &&
                        usersData.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default UserOverview;