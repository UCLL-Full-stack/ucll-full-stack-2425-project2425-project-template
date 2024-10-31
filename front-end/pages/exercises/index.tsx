import ExerciseOverviewTable from "@/components/exercises/ExerciseOverviewTable";
import Header from "@/components/header";
import ExerciseService from "@/services/exercise/ExerciseService";
import { Exercise } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Exercises: React.FC = () => {
  const [exercises, setExercises] = useState<Array<Exercise>>();
  const [error, setError] = useState<string>();

  const getExercises = async () => {
    try {
      const response = await ExerciseService.getAllExercises();
      const exercises = await response.json();
      setExercises(exercises);
    } catch (err) {
      setError("Failed to fetch exercises.");
    }
  };

  const handleAddExercise = (exercise: Exercise) => {
    console.log(`Exercise ${exercise.name} added to workout`);
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
          <h1 className="text-4xl font-bold text-black text-center mb-8">
            Exercises
          </h1>
          <section className="space-y-4">
            {error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : exercises ? (
              <ExerciseOverviewTable
                exercises={exercises}
                onAddExercise={handleAddExercise}
              />
            ) : (
              <p className="text-center text-gray-600">Loading exercises...</p>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Exercises;
