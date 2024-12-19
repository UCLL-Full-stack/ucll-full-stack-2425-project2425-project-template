import ExerciseService from "@/services/exercise/ExerciseService";
import { Exercise } from "@/types";
import { Star } from "lucide-react";
import { useState } from "react";
import { Plus } from "react-feather";

type Props = {
  exercises: Array<Exercise>;
  onAddExercise?: (exercise: Exercise) => void;
  showAddButton?: boolean;
};

const ExerciseOverviewTable: React.FC<Props> = ({
  exercises,
  onAddExercise,
  showAddButton = true,
}) => {
  const [exerciseList, setExerciseList] = useState(exercises);

  const toggleFavorite = async (id: string) => {
    const response = await ExerciseService.toggleFavorite(id);
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Failed to toggle the exercise");
    } else {
      const updatedExercises = exerciseList.map((exercise) =>
        exercise.id === id
          ? { ...exercise, isFavorite: !exercise.isFavorite }
          : exercise
      );
      setExerciseList(updatedExercises);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {exerciseList.map((exercise, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex justify-between items-start"
        >
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {exercise.name}
            </h2>
            <p className="text-sm text-gray-600 mt-2">{exercise.description}</p>
            <a
              href={exercise.video_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 block cursor-pointer"
            >
              Watch Video
            </a>
          </div>
          <Star
            className={`text-xl cursor-pointer ${
              exercise.isFavorite ? "text-yellow-400" : "text-gray-300"
            }`}
            onClick={() => toggleFavorite(exercise.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ExerciseOverviewTable;
