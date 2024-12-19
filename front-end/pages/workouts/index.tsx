import Header from "@/components/header";
import WorkoutOverviewTable from "@/components/workouts/WorkoutOverviewTable";
import WorkoutService from "@/services/workout/WorkoutService";
import { Workout } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

const Workouts: React.FC = () => {
  // const [workouts, setWorkouts] = useState<Array<Workout>>([]);
  // const [error, setError] = useState<string>();
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
          <div className="flex items-center justify-between mb-8 py-5">
            <div className="flex items-center gap-2">
              <h1 className="text-4xl font-bold text-black">Workouts</h1>
              <Link href="/workouts/add">
                <button className=" hover:text-blue-400 text-blue-700 font-bold p-0 ml-3 mt-2 rounded">
                  <CirclePlus size={30} />
                </button>
              </Link>
            </div>
          </div>
          <section className="space-y-4">
            {role === "user" && (
              <>
                {error && <div className="text-red-800">{error}</div>}
                {isLoading && <div className="text-green-800">Loading...</div>}
                {data && <WorkoutOverviewTable workouts={data.workouts} />}
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
