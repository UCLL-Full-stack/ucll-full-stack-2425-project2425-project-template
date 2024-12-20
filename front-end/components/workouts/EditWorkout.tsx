import { useState, useEffect } from "react";
import WorkoutService from "@/services/workout/WorkoutService";
import { Workout } from "@/types";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/router";

type Props = {
  workoutId: string;
};

const EditWorkout: React.FC<Props> = ({ workoutId }) => {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await WorkoutService.getWorkoutById(workoutId);
        if (!response.ok) throw new Error("Failed to fetch workout.");
        const data = await response.json();
        setWorkout(data);
        setName(data.name || "");
        setDescription(data.description || "");
      } catch {
        toast.error("Unable to load workout details.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [workoutId]);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !description) {
      toast.error("Both fields are required.");
      return;
    }

    try {
      const updatedWorkout: Workout = {
        id: workoutId,
        name,
        description,
        user: workout?.user || undefined,
        exercises: workout?.exercises || [],
      };

      const response = await WorkoutService.updateWorkout(updatedWorkout);
      if (!response.ok) throw new Error("Failed to update workout.");

      toast.success("Workout updated successfully!");
      router.push("/workouts");
    } catch {
      toast.error("Failed to update workout.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
      >
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Workout Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-md p-2"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Update Workout
        </button>
      </form>
      <Toaster />
    </>
  );
};

export default EditWorkout;
