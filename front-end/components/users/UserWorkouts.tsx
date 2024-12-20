import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Workout } from "@/types";
import WorkoutService from "@/services/workout/WorkoutService";
import { Plus } from "react-feather";
import Link from "next/link";

interface UserWorkoutsProps {
  userId: string;
}

const UserWorkouts: React.FC<UserWorkoutsProps> = ({ userId }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await WorkoutService.getWorkoutsByUserId(userId);
        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 404) {
            setWorkouts([]);
          } else {
            throw new Error(errorData.message || "Failed to fetch workouts.");
          }
        } else {
          const data = await response.json();
          setWorkouts(data);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [userId]);

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

  if (loading) return <p>Loading workouts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

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
              <div className="space-y-2">
                {workout.exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded shadow"
                  >
                    <div>
                      <p className="text-gray-800 font-medium">
                        {exercise.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {exercise.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveExercise(exercise.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleRemoveWorkout(workout.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete Workout
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="mt-4">
        <Link
          href={{
            pathname: "/workouts/add",
            query: { userId },
          }}
          className="w-full flex items-center justify-center bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-medium py-3 rounded-lg shadow-md"
        >
          <Plus className="mr-2" /> Add New Workout
        </Link>
      </div>
    </div>
  );
};

export default UserWorkouts;
