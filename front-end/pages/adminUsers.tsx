import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import errorStyles from '../styles/errorMessage.module.css';
import styles from '../styles/Users.module.css';

const AdminUsersPage: React.FC = () => {
    const { t } = useTranslation('common');
    const [users, setUsers] = useState<any[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);

    // Check if the logged-in user is an admin
    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser);
            if (user.role === 'admin') {
                setIsAdmin(true);
                const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
                setUsers(allUsers);
            }
        }
    }, []);

    if (!isAdmin) {
        return <div className={errorStyles.logInMessage}>{t("error.notAuthorized")}</div>;
    }

    if (!users.length) {
        return <div>{t("users.noUsers")}</div>;
    }

    return (
        <div className={styles.usersTableContainer}>
            <h2>{t("admin.usersList")}</h2>
            <table className={`${styles.table} table-hover`}>
                <thead>
                    <tr>
                        <th scope="col">{t("user.name")}</th>
                        <th scope="col">{t("user.email")}</th>
                        <th scope="col">{t("user.role")}</th>
                        <th scope="col">{t("user.password")}</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsersPage;
