import { useEffect, useState } from "react";
import UserService from "@/services/user/UserService";
import { User } from "@/types";
import { useRouter } from "next/router";
import Header from "@/components/header";
import { toast } from "sonner";

const getToken = () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    const parsedUser = JSON.parse(loggedInUser);
    return parsedUser.token || null;
  }
  return null;
};

const PromotePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [promoteLoading, setPromoteLoading] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  const fetchUsers = async () => {
    if (!token) return;
    setFetchLoading(true);
    try {
      const response = await UserService.getAllUsers(token);
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.errorMessage || "Failed to fetch users");
      setUsers(data);
    } catch (err: any) {
      toast.error(err.message || "An error occurred while fetching users.", {
        style: { background: "#f44336", color: "#fff" },
      });
    } finally {
      setFetchLoading(false);
    }
  };

  const handlePromote = async (userId: string) => {
    if (!token) return;
    setPromoteLoading(userId);
    try {
      const response = await UserService.promoteToTrainer(userId, token);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.errorMessage || "Failed to promote user.");
      }
      toast.success("User promoted successfully!", {
        style: { background: "#4caf50", color: "#fff" },
      });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: "trainer" } : user
        )
      );
    } catch (err: any) {
      toast.error(
        err.message || "An error occurred while promoting the user.",
        {
          style: { background: "#f44336", color: "#fff" },
        }
      );
    } finally {
      setPromoteLoading(null);
    }
  };

  useEffect(() => {
    const token = getToken();
    setToken(token);
    const loggedInUser = localStorage.getItem("loggedInUser");
    const userRole = loggedInUser ? JSON.parse(loggedInUser).role : null;
    setRole(userRole);

    // Redirect non-admin users
    if (!userRole || userRole !== "admin") {
      router.push("/"); // Redirect unauthorized users to the home page
    }
  }, [router]);

  useEffect(() => {
    if (token && role === "admin") {
      fetchUsers();
    }
  }, [token, role]);

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Promote Users to Trainer
        </h1>
        {fetchLoading && (
          <p className="text-blue-500 text-lg">Loading users...</p>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600 uppercase">
                  Email
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600 uppercase">
                  Role
                </th>
                <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id || user.email}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } border-t`}
                >
                  <td className="py-3 px-6 text-gray-700">{user.email}</td>
                  <td className="py-3 px-6 text-gray-700 capitalize">
                    {user.role}
                  </td>
                  <td className="py-3 px-6">
                    {user.role !== "trainer" ? (
                      user.id ? (
                        <button
                          onClick={() => handlePromote(user.id!)}
                          className={`bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring focus:ring-blue-200 focus:outline-none ${
                            promoteLoading === user.id
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={promoteLoading === user.id}
                        >
                          {promoteLoading === user.id
                            ? "Promoting..."
                            : "Promote to Trainer"}
                        </button>
                      ) : (
                        <span className="text-red-500 text-sm">
                          Invalid User ID
                        </span>
                      )
                    ) : (
                      <span className="text-green-500 text-sm font-medium">
                        Trainer
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PromotePage;
