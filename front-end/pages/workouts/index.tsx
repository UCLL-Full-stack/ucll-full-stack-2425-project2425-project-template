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
                  <>
                    <WorkoutOverviewTable workouts={data.workouts} />
                    <div className="mt-4">
                      <Link href="/workouts/add">
                        <button className="w-full flex items-center justify-center bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-medium py-3 rounded-lg shadow-md">
                          <Plus className="mr-2" /> Add New Workout
                        </button>
                      </Link>
                    </div>
                  </>
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
