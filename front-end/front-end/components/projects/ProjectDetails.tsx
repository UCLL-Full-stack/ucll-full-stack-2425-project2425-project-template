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
            <h2>Selected project: {project.name}</h2>
            <UserOverviewTable project={project} />

            <ul>
                {users.map((user) => (
                    <li key={user.userId} className="flex items-center justify-between mb-2">
                        <span>
                            {user.firstName} {user.lastName} ({user.role})
                        </span>
                        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center ml-10 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={() => addUserToProject(user.userId)}>
                            Add to Project
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectDetails;
