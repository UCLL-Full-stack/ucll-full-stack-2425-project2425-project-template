import { User, Workout } from "@/types";
import { useState } from "react";
import { Plus } from "react-feather";
import WorkoutInfo from "./WorkoutInfo";
import Link from "next/link";
import { toast } from "sonner";
import WorkoutService from "@/services/workout/WorkoutService";
import { useRouter } from "next/router";

type Props = {
  workouts: Array<Workout>;
  setWorkouts: (workouts: Array<Workout>) => void;
};

const WorkoutOverviewTable: React.FC<Props> = ({ workouts, setWorkouts }) => {
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(
    null
  );

  const router = useRouter();

  const toggleWorkout = (workoutId: string) => {
    setSelectedWorkoutId(selectedWorkoutId === workoutId ? null : workoutId);
  };

  const handleRemoveExercise = async (exerciseId: string) => {
    if (!selectedWorkoutId) {
      toast.error("No workout selected.");
      return;
    }

    try {
      const response = await WorkoutService.removeExerciseFromWorkout(
        selectedWorkoutId,
        exerciseId
      );
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to remove exercise.");
      }
      const updatedWorkouts = workouts.map((workout) =>
        workout.id === selectedWorkoutId
          ? {
              ...workout,
              exercises: workout.exercises.filter(
                (exercise) => exercise.id !== exerciseId
              ),
            }
          : workout
      );
      setWorkouts(updatedWorkouts);
      toast.success("Exercise removed successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to remove exercise."
      );
    }
  };

  const handleRemoveWorkout = async (workoutId: string) => {
    try {
      const response = await WorkoutService.removeWorkout(workoutId);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to remove workout.");
      }
      const updatedWorkouts = workouts.filter(
        (workout) => workout.id !== workoutId
      );
      setWorkouts(updatedWorkouts);
      toast.success("Workout removed successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to remove workout."
      );
    }
  };

  const handleEditWorkout = (workoutId: string) => {
    router.push(`/workouts/edit/${workoutId}`);
  };

  return (
    <div className="space-y-6">
      {workouts.map((workout) => (
        <div
          key={workout.id}
          className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden"
        >
          <div
            onClick={() => toggleWorkout(workout.id)}
            className="px-6 py-4 cursor-pointer flex flex-col hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {workout.name}
            </h2>
            <p className="text-sm text-gray-600">{workout.description}</p>
          </div>
          {selectedWorkoutId === workout.id && (
            <div className="px-6 pb-4">
              <WorkoutInfo
                workout={workout}
                onRemoveExercise={handleRemoveExercise}
                onRemoveWorkout={() => handleRemoveWorkout(workout.id)}
                onEditWorkout={() => handleEditWorkout(workout.id)}
              />
            </div>
          )}
        </div>
      ))}
      <div className="mt-4">
        <Link href="/workouts/add">
          <button className="w-full flex items-center justify-center bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-medium py-3 rounded-lg shadow-md">
            <Plus className="mr-2" /> Add New Workout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WorkoutOverviewTable;
