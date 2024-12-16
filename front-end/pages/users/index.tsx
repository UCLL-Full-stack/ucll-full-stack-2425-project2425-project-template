import UserService from '@services/UserService';
import { useEffect, useState } from 'react';
import { User } from '@types';
import Head from 'next/head';
import Header from '@components/header';
import UserOverviewTable from '@components/users/UserOverviewTable';

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getUsers = async () => {
        const response = await UserService.getUsers();
        if (!response.ok) {
            if (response.status === 401) {
                setError('You are not authorized to view this page.');
            } else {
                setError(response.statusText);
            }
        } else {
            const users = await response.json();
            setUsers(users);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const selectUser = (user: User) => {
        setSelectedUser(user);
    };

    return (
        <>
            <Head>
                <title>Users</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Users</h1>
                <section>
                    <h2>Users overview</h2>
                    {error && <div className="text-center text-red-800">{error}</div>}

                    {users && <UserOverviewTable users={users} selectUser={selectUser} />}
                </section>
                {/* {selectedUser && (
                    <section>
                        <h2>Courses taught by {selectedUser.user.firstName}</h2>
                        <CourseOverviewTable user={selectedUser} />
                    </section>
                )} */}
            </main>
        </>
    );
};

export default Users;
