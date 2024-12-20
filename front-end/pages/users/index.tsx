import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "@/components/header";
import UserList from "@/components/users/UserList";

const UsersPage: React.FC = () => {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const userRole = loggedInUser ? JSON.parse(loggedInUser).role : null;
    setRole(userRole);

    if (!userRole || (userRole !== "admin" && userRole !== "trainer")) {
      router.push("/"); // Redirect unauthorized users to the home page
    }
  }, [router]);

  if (!role) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <main className="max-w-screen-lg mx-auto py-8">
        <UserList />
      </main>
    </>
  );
};

export default UsersPage;
