import WorkoutService from "@/services/workout/WorkoutService";
import { User } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toaster, toast } from "sonner";
type Props = {
  user: User;
};
const WorkoutCreator: React.FC<Props> = ({ user }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !description.trim()) {
      toast.error("Both fields are required.");
      return;
    }
    try {
      const workout = {
        id: "",
        name,
        description,
        user,
        exercises: [],
      };
      const response = await WorkoutService.createWorkout(workout);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create the workout.");
      }
      toast.success("Workout created successfully!");
      setTimeout(() => {
        router.push("/workouts");
      }, 2000);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create the workout."
      );
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
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
            className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-300"
            placeholder="Enter workout name"
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
            className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 border-gray-300"
            placeholder="Enter workout description"
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Create Workout
        </button>
      </form>
      <Toaster richColors />
    </>
  );
};
export default WorkoutCreator;
