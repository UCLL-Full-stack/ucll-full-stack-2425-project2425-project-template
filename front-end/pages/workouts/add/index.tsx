import WorkoutCreator from "@/components/workouts/WorkoutCreator";
import Header from "@/components/header";
import { User } from "@/types";
import { useEffect, useState } from "react";

const AddWorkout: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const user = loggedInUser ? JSON.parse(loggedInUser) : null;
    setUser(user);
    setRole(user?.role || null);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="py-4 bg-gray-50 min-h-screen">
        <div className="max-w-screen-md mx-auto px-6">
          <h1 className="text-3xl font-bold text-center mb-6">
            Create Workout
          </h1>
          <WorkoutCreator user={user} />
        </div>
      </main>
    </>
  );
};

export default AddWorkout;
