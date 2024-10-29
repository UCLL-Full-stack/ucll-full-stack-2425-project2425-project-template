import WorkoutInfo from "@/components/workouts/WorkoutInfo";
import WorkoutService from "@/services/WorkoutService";
import { Workout } from "@/types";
import Head from "next/head";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

const ReadWorkoutById = () => {
  const [workout, setWorkout] = useState<Workout | null>(null);

  const router = useRouter();
  const { workoutId } = router.query;

  const getWorkoutById = async () => {
    const [workoutResponse] = await Promise.all([
      WorkoutService.getWorkoutById(workoutId as string),
    ]);
    const [workoutt] = await Promise.all([workoutResponse.json()]);
    setWorkout(workoutt);
  };

  useEffect(() => {
    if (workoutId) {
      getWorkoutById();
    }
  }, [workoutId]);

  return (
    <>
      <title>Workout Info</title>
      <main>
        <h1>Info of Workout</h1>
        {!workout && <p>Loading...</p>}
        {workout && (
          <section>
            <WorkoutInfo workout={workout} />
          </section>
        )}
      </main>
    </>
  );
};

export default ReadWorkoutById;
