import Header from "@/components/header";
import WorkoutOverviewTable from "@/components/workouts/WorkoutOverviewTable";
import WorkoutService from "@/services/workout/WorkoutService";
import { Workout } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import Link from "next/link";
import { Plus } from "react-feather";

const Workouts: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [workouts, setWorkouts] = useState<Array<Workout>>([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const userRole = loggedInUser ? JSON.parse(loggedInUser).role : null;
    setRole(userRole);
  }, []);

  const getWorkouts = async () => {
    const response = await WorkoutService.getAllWorkouts();

    if (response.ok) {
      const workouts = await response.json();
      return { workouts };
    }
  };

  const { data, error, isLoading } = useSWR("workouts", getWorkouts);

  useInterval(() => {
    mutate("workouts", getWorkouts());
  }, 1000);

  return (
    <>
      <Head>
        <title>Workouts</title>
      </Head>

      <Header />

      <main className="py-4 bg-gray-50 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-black">Workouts</h1>
          </div>

          <section className="space-y-4">
            {role === "user" && (
              <>
                {error && <div className="text-red-800">{error}</div>}
                {isLoading && <div className="text-green-800">Loading...</div>}
                {data && (
                  <WorkoutOverviewTable
                    workouts={data.workouts}
                    setWorkouts={setWorkouts}
                  />
                )}
              </>
            )}
            {role !== "user" && (
              <div>You do not have permission to view this page.</div>
            )}
          </section>
        </div>
        <Toaster richColors />
      </main>
    </>
  );
};

export default Workouts;
