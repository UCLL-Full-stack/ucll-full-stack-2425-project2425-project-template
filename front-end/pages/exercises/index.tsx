import ExerciseOverviewTable from "@/components/exercises/ExerciseOverviewTable";
import Header from "@/components/header";
import ExerciseService from "@/services/exercise/ExerciseService";
import workoutService from "@/services/workout/WorkoutService";
import { Exercise } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Toaster, toast } from "sonner";

const Exercises: React.FC = () => {
  const [exercises, setExercises] = useState<Array<Exercise>>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { workoutId, showAddButton } = router.query;

  const getExercises = async () => {
    try {
      const response = await ExerciseService.getAllExercises();
      const exercises = await response.json();
      setExercises(exercises);
    } catch (err) {
      setError("Failed to fetch exercises.");
    }
  };

  const handleAddExercise = async (exercise: Exercise) => {
    if (!workoutId) {
      toast.error("Workout ID is not provided.");
      return;
    }

    try {
      const response = await workoutService.addExerciseToWorkout(
        parseInt(workoutId as string),
        exercise.id
      );
      if (!response.ok) {
        throw new Error("Failed to add exercise to workout.");
      }
      toast.success("Exercise added successfully!");
      router.push("/workouts");
    } catch (err) {
      console.error(err);
      toast.error("This exercise is already part of your workout");
    }
  };

  useEffect(() => {
    getExercises();
  }, []);

  return (
    <>
      <Head>
        <title>Exercises</title>
      </Head>
      <Header />
      <main className="py-4 bg-gray-50 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-black text-center mb-8 py-5">
            Exercises
          </h1>
          <section className="space-y-4">
            {error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : exercises.length > 0 ? (
              <ExerciseOverviewTable
                exercises={exercises}
                onAddExercise={handleAddExercise}
                showAddButton={showAddButton === "true"}
              />
            ) : (
              <p className="text-center text-gray-600">Loading exercises...</p>
            )}
          </section>
        </div>
        <Toaster richColors />
      </main>
    </>
  );
};

export default Exercises;
