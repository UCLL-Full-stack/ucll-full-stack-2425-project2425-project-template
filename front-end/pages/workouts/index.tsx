import WorkoutOverviewTable from "@/components/workouts/WorkoutOverviewTable";
import WorkoutService from "@/services/WorkoutService";
import { Workout } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Workouts: React.FC = () => {
  const [workouts, setWorkouts] = useState<Array<Workout>>([]);

  const getWorkouts = async () => {
    const response = await WorkoutService.getAllWorkouts();
    const workoutss = await response.json();
    setWorkouts(workoutss);
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  return (
    <>
      <Head>
        <title>Workouts</title>
      </Head>
      <main>
        <h1>Workouts</h1>
        <section>
          {workouts && <WorkoutOverviewTable workouts={workouts} />}
        </section>
      </main>
    </>
  );
};

export default Workouts;
