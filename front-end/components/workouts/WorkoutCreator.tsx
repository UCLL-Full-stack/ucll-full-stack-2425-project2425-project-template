import WorkoutService from "@/services/workout/WorkoutService";
import { User } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  user: User;
};

const WorkoutCreator: React.FC<Props> = ({ user }) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");

  const router = useRouter();

  const validate = () => {
    let isValid = true;
    setErrors([]);

    if (!name.trim()) {
      setErrors((errors) => [...errors, "Name is required."]);
      isValid = false;
    }
    if (!description.trim()) {
      setErrors((errors) => [...errors, "Description is required."]);
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const workout = {
      name,
      description,
      user: user,
    };

    const response = await WorkoutService.createWorkout(workout);
    const data = await response.json();

    if (!response.ok) {
      setErrors((errors) => [...errors, data.message]);
    } else {
      setStatus("Workout created successfully!");
      setTimeout(() => {
        router.push("/workouts");
      }, 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
    >
      <div className="mb-4">
        {!!errors.length && (
          <ul className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-4">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        {status && (
          <p className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-4">
            {status}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Workout Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter workout name"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Enter workout description"
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Create Workout
      </button>
    </form>
  );
};

export default WorkoutCreator;
