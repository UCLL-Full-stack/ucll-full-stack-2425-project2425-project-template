import React, { useEffect, useState } from 'react';
import { Project, User } from '@types';
import UserOverviewTable from '../users/UserOverviewTable';
import UserService from '@/services/UserService';

type Props = {
    project: Project;
};

const ProjectDetails: React.FC<Props> = ({ project }) => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        // Fetch all users when the component mounts
        const fetchUsers = async () => {
            try {
                const allUsers = await UserService.getAllUsers(); // Fetch all users
                setUsers(allUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    // Function to add a user to the project
    const addUserToProject = async (userId: string) => {
        try {
            await UserService.addUserToProject(project.id, userId);
            // Optionally refresh the project data here to reflect the changes
        } catch (error) {
            console.error('Error adding user to project:', error);
        }
    };

    return (
        <div>
            <h3>Project Users</h3>
            <UserOverviewTable project={project} />

            <ul>
                {users.map((user) => (
                    <li key={user.userId}>
                        {user.firstName} {user.lastName} ({user.role})
                        <button onClick={() => addUserToProject(user.userId)}>
                            Add to Project
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectDetails;
