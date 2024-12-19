import WorkoutCreator from "@/components/workouts/WorkoutCreator";
import WorkoutService from "@/services/workout/WorkoutService";
import { User } from "@/types";
import { useEffect, useState } from "react";

const addWorkout: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const user = loggedInUser ? JSON.parse(loggedInUser) : null;
    setUser(user);
    setRole(user?.role || null);
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <title>Create Workout</title>
      <WorkoutCreator user={user} />
    </div>
  );
};

export default addWorkout;
