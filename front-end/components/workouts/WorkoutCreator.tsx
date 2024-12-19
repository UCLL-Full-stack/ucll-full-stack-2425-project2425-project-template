import WorkoutService from "@/services/workout/WorkoutService";
import { User } from "@/types";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  user: User;
};

const WorkoutCreator = ({ user }: Props) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");

  const router = useRouter();

  const validate = () => {
    let result = true;
    setErrors([]);

    if (!name) {
      setErrors((errors) => [...errors, "Name is required."]);
      result = false;
    }
    if (!description) {
      setErrors((errors) => [...errors, "Description is required."]);
      result = false;
    }
    return result;
  };

  const handleSubmit = async (event: any) => {
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
      setStatus("Workout created successfully.");
      setTimeout(() => {
        router.push("/workouts");
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="m-3">
        {!!errors.length && (
          <ul className="text-red-800 rounded-lg" role="alert">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        {status && (
          <p className="text-green-800" role="alert">
            {status}
          </p>
        )}
      </div>
      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium">Name:</label>
        <div className="">
          <input
            type="text"
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium">Description:</label>
        <div className="col-sm-8">
          <input
            type="text"
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Create Workout
      </button>
    </form>
  );
};

export default WorkoutCreator;
