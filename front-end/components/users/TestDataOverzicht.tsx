import React from 'react';
import styles from '@/styles/Users.module.css';

const TestDataOverzicht: React.FC = () => {
    const testData = [
        { username: "JohndD", password: "password", role: "Admin" },
        { username: "JaneT", password: "hihihi3", role: "Manager" },
        { username: "NinadW", password: "helloworld!", role: "Klant" }
    ];

    return (
        <div>
            <h2 className={styles.title}>Test Data</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {testData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.username}</td>
                            <td>{data.password}</td>
                            <td>{data.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TestDataOverzicht;