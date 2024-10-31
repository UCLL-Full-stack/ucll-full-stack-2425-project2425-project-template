import WorkoutOverviewTable from "@/components/workouts/WorkoutOverviewTable";
import WorkoutService from "@/services/WorkoutService";
import { Workout } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Workouts: React.FC = () => {
  const [workouts, setWorkouts] = useState<Array<Workout>>();
  const [error, setError] = useState<string>();

  const getWorkouts = async () => {
    const response = await WorkoutService.getAllWorkouts();
    const workouts = await response.json();
    setWorkouts(workouts);
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
        <div>
          <h1>Workouts</h1>
          <section>
            {error ? (
              <p>{error}</p>
            ) : workouts ? (
              <WorkoutOverviewTable workouts={workouts} />
            ) : (
              <p>Loading workouts...</p>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Workouts;
