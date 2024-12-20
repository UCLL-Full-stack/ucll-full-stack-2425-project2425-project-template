import { useEffect, useState } from "react";
import UserService from "@/services/user/UserService"; // Update with your actual path
import { User } from "@/types";
import { useRouter } from "next/router";
import { Toaster, toast } from "sonner";
import Header from "./header";

const PromotePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null); // State for token
  const router = useRouter();

  // Fetch token on the client side
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setToken(parsedUser.token);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return; // Wait until the token is loaded
      try {
        setLoading(true);
        const response = await UserService.getAllUsers(token); // Pass token to service
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.errorMessage || "Failed to fetch users");
        setUsers(data);
        toast.success("Users fetched successfully!", {
          style: { background: "#4caf50", color: "#fff" },
        });
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch users.", {
          style: { background: "#f44336", color: "#fff" },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]); // Re-run when the token is updated

  const handlePromote = async (userId: string) => {
    if (!token) return; // Ensure token is available
    try {
      setLoading(true);
      const response = await UserService.promoteToTrainer(userId, token); // Pass token to service
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.errorMessage || "Failed to promote user.");
      }
      toast.success("User promoted successfully!", {
        style: { background: "#4caf50", color: "#fff" },
      });
      router.reload(); // Reload page to fetch updated data
    } catch (err: any) {
      toast.error(err.message || "Failed to promote user.", {
        style: { background: "#f44336", color: "#fff" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <Toaster position="top-right" richColors /> {/* Toast container */}
        <h1 className="text-3xl font-bold mb-4">Promote Users to Trainer</h1>
        {loading && <p className="text-blue-500">Loading...</p>}
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id || user.email} className="border-t">
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 capitalize">{user.role}</td>
                <td className="py-2 px-4">
                  {user.role !== "trainer" ? (
                    user.id ? (
                      <button
                        onClick={() => handlePromote(user.id!)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Promote to Trainer
                      </button>
                    ) : (
                      <span className="text-red-500">Invalid User ID</span>
                    )
                  ) : (
                    <span className="text-green-500">Trainer</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PromotePage;
