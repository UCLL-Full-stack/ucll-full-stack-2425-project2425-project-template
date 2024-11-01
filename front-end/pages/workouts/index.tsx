import Header from "@/components/header";
import WorkoutOverviewTable from "@/components/workouts/WorkoutOverviewTable";
import WorkoutService from "@/services/workout/WorkoutService";
import { Workout } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Workouts: React.FC = () => {
  const [workouts, setWorkouts] = useState<Array<Workout>>([]);
  const [error, setError] = useState<string>();

  const getWorkouts = async () => {
    try {
      const response = await WorkoutService.getAllWorkouts();
      const workouts = await response.json();
      setWorkouts(workouts);
    } catch (err) {
      setError("Failed to fetch workouts.");
    }
  };

  useEffect(() => {
    getWorkouts();
  }, []);

  return (
    <>
      <Head>
        <title>Workouts</title>
      </Head>
      <Header />

      <main className="py-4 bg-gray-50 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-black mb-8">Workouts</h1>
          <section className="space-y-4">
            {error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : workouts ? (
              <WorkoutOverviewTable
                workouts={workouts}
                setWorkouts={setWorkouts}
              />
            ) : (
              <p className="text-center text-gray-600">Loading workouts...</p>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Workouts;
