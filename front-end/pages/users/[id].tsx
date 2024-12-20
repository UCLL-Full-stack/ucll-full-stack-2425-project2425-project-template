import Header from "@/components/header";
import UserWorkouts from "@/components/users/UserWorkouts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserWorkoutsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const userRole = loggedInUser ? JSON.parse(loggedInUser).role : null;
    setRole(userRole);

    if (!userRole || (userRole !== "admin" && userRole !== "trainer")) {
      router.push("/"); // Redirect unauthorized users to the home page
    }
  }, [router]);

  if (!id || !role) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <main className="max-w-screen-lg mx-auto py-8">
        <UserWorkouts userId={id as string} />
      </main>
    </>
  );
};

export default UserWorkoutsPage;
