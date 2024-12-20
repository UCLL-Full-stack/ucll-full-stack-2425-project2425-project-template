import ExerciseOverviewTable from "@/components/exercises/ExerciseOverviewTable";
import Header from "@/components/header";
import ExerciseService from "@/services/exercise/ExerciseService";
import workoutService from "@/services/workout/WorkoutService";
import { Exercise } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Toaster, toast } from "sonner";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const Exercises: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const [addedExerciseIds, setAddedExerciseIds] = useState<Set<string>>(new Set());
  const router = useRouter();
  const { workoutId, showAddButton } = router.query;

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const userRole = loggedInUser ? JSON.parse(loggedInUser).role : null;
    setRole(userRole);
  }, []);

  const getExercises = async () => {
    const response = await ExerciseService.getAllExercises();
    if (response.ok) {
      const exercises = await response.json();
      return { exercises };
    }
  };

  const { data, error, isLoading } = useSWR("exercises", getExercises);

  useInterval(() => {
    mutate("exercises", getExercises());
  }, 1000);

  const handleAddExercise = async (exercise: Exercise) => {
    if (!workoutId) {
      toast.error("Workout ID is not provided.");
      return;
    }

    if (addedExerciseIds.has(exercise.id)) {
      toast.error("This exercise is already part of your workout.");
      return;
    }

    try {
      const response = await workoutService.addExerciseToWorkout(
        workoutId as string,
        exercise.id
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add exercise to workout.");
      }
      setAddedExerciseIds((prev) => new Set(prev).add(exercise.id));
      toast.success("Exercise added successfully!");
    } catch (err) {
      toast.error("Failed to add exercise to workout.");
    }
  };

  return (
    <>
      <Head>
        <title>Exercises</title>
      </Head>
      <Header />
      <main className="py-4 bg-gray-50 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-black">Exercises</h1>
          </div>
          <section className="space-y-4">
            {role === "user" && (
              <>
                {error && <div className="text-red-800">{error}</div>}
                {isLoading && <div className="text-green-800">Loading...</div>}
                {data && (
                  <ExerciseOverviewTable
                    exercises={data.exercises}
                    onAddExercise={handleAddExercise}
                    showAddButton={showAddButton === "true"}
                  />
                )}
              </>
            )}
            {role !== "user" && (
              <div className="text-red-600 font-medium">
                You do not have permission to view this page.
              </div>
            )}
          </section>
        </div>
        <Toaster richColors />
      </main>
    </>
  );
};

export default Exercises;