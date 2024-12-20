import React, { useState, useEffect } from "react";
import UserService from "@services/userService";
import { User, StatusMessage } from "types";
import classNames from "classnames";

type Props = {
    users: Array<User>;
};

const UserOverview: React.FC<Props> = ({ users }: Props) => {
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [newRole, setNewRole] = useState<string>('');

    const loggedInUser = localStorage.getItem('loggedInUser');
    const loggedInUserId = loggedInUser ? JSON.parse(loggedInUser).id : null;

    const clearErrors = () => {
        setStatusMessages([]);
    };

    const handleUpdateRole = async (userId: number) => {
        clearErrors();

        const adminId = loggedInUserId;

        if (!adminId) {
            setStatusMessages([{ message: "Admin not logged in", type: 'error' }]);
            return;
        }

        const response = await UserService.updateRole(userId, newRole, adminId);
        const data = await response.json();

        if (!response.ok) {
            setStatusMessages([{ message: data.message || "Error occurred", type: 'error' }]);
        } else {
            setStatusMessages([{ message: 'Role updated successfully', type: 'success' }]);
            setSelectedUserId(null);
            setNewRole('');
        }
    };

    return (
        <>
            {users && (
                <table className="mt-6 w-100">
                    <thead className="bg-yellow-200 border-b-yellow-400 border-b-8">
                        <tr>
                            <th className="pl-10"></th>
                            <th className="px-12 py-5 text-xl">First Name</th>
                            <th className="px-12 py-5 text-xl">Last Name</th>
                            <th className="px-12 py-5 text-xl">Username</th>
                            <th className="px-12 py-5 text-xl">Email</th>
                            <th className="px-12 py-5 text-xl">Role</th>
                            <th className="px-12 py-5 text-xl">Update Role</th>
                            <th className="pr-10"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-400 border-b-gray-800 border-b-8">
                        {users.map((user, index) => (
                            <tr key={index} role="button">
                                <td className="pl-10"></td>
                                <td className="px-12 py-5">{user.firstName}</td>
                                <td className="px-12 py-5">{user.lastName}</td>
                                <td className="px-12 py-5">{user.username}</td>
                                <td className="px-12 py-5">{user.email}</td>
                                <td className="px-12 py-5">{user.role}</td>
                                <td className="px-12 py-5">
                                    {loggedInUserId !== user.id ? (
                                        selectedUserId === user.id ? (
                                            <div>
                                                <select
                                                    value={newRole}
                                                    onChange={(e) => setNewRole(e.target.value)}
                                                    className="border border-gray-300 rounded p-2"
                                                >
                                                    <option value="">Select Role</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="user">User</option>
                                                    <option value="artist">Artist</option>
                                                </select>
                                                <button
                                                    onClick={() => user.id !== undefined && handleUpdateRole(user.id)}
                                                    className="ml-2 bg-blue-500 text-white p-2 rounded"
                                                >
                                                    Update
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => user.id !== undefined && setSelectedUserId(user.id)}
                                                className="bg-yellow-500 text-white p-2 rounded"
                                            >
                                                Change Role
                                            </button>
                                        )
                                    ) : (
                                        <span className="text-gray-500">Cannot update your own role</span>
                                    )}
                                </td>
                                <td className="pr-10"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {users.length === 0 && (
                <p className="text-red-500">There are no users available in the overview</p>
            )}
            {statusMessages.length > 0 && (
                <div className="mt-4">
                    <ul className="list-none mb-3 mx-auto text-sm">
                        {statusMessages.map(({ message, type }, index) => (
                            <li
                                key={index}
                                className={classNames({
                                    "text-red-800": type === "error",
                                    "text-green-800": type === "success",
                                })}
                            >
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default UserOverview;