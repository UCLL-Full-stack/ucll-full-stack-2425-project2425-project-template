import { useEffect, useState } from "react";
import Link from "next/link";
import UserService from "@/services/user/UserService";
import { User } from "@/types";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const userToken = loggedInUser ? JSON.parse(loggedInUser).token : null;
    setToken(userToken);

    const fetchUsers = async () => {
      if (!userToken) {
        setError("User is not authenticated. Token is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await UserService.getAllUsers(userToken);
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }
        const data = await response.json();

        const nonAdminUsers = data.filter(
          (user: User) => user.role !== "admin"
        );

        setUsers(nonAdminUsers);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">All Users</h1>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
            >
              <Link
                href={`/users/${user.id}`}
                className="text-blue-500 hover:underline font-semibold"
              >
                {user.firstName} {user.lastName}
              </Link>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;