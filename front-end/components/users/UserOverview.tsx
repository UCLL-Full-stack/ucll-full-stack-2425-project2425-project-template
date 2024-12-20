import React from 'react';
import { UserInput } from "@types";
import styles from '@styles/home.module.css';

type Props = {
    usersData: UserInput[];
};

const UserOverview: React.FC<Props> = ({ usersData }: Props) => {

    const downloadCSV = () => {
        const headers = ['Username', 'Name', 'Email', 'Role'];
        const rows = usersData.map(user => [user.username, user.name, user.email, user.role]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "users_list.csv");
        document.body.appendChild(link); // Required for FF

        link.click();
    };

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
            <div className={styles.downloadButtonHolder}>
                <button
                    onClick={downloadCSV}
                    className={styles.downloadButton}>
                    Download Users List
                </button>
            </div>
        </div>
    );
};

export default UserOverview;