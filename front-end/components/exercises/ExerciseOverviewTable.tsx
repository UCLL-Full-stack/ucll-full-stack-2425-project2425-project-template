import ExerciseService from "@/services/exercise/ExerciseService";
import { Exercise } from "@/types";
import { Star } from "lucide-react";
import { useState } from "react";
import { Plus } from "react-feather";
import { toast } from "sonner";

type Props = {
  exercises: Array<Exercise>;
  onAddExercise?: (exercise: Exercise) => void;
  showAddButton?: boolean;
};

const ExerciseOverviewTable: React.FC<Props> = ({
  exercises,
  onAddExercise,
  showAddButton = false,
}) => {
  const [exerciseList, setExerciseList] = useState(exercises);

  const toggleFavorite = async (id: string) => {
    try {
      const response = await ExerciseService.toggleFavorite(id);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to toggle favorite status.");
      }

      const updatedExercises = exerciseList.map((exercise) =>
        exercise.id === id
          ? { ...exercise, isFavorite: !exercise.isFavorite }
          : exercise
      );
      setExerciseList(updatedExercises);

      // Show a toast message
      const toggledExercise = exerciseList.find(
        (exercise) => exercise.id === id
      );
      const status = toggledExercise?.isFavorite ? "removed from" : "added to";
      toast.success(
        `Exercise "${toggledExercise?.name}" has been ${status} favorites.`,
        { duration: 2000 } // Toast will disappear in 2 seconds
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to toggle favorite status.",
        { duration: 2000 } // Toast will disappear in 2 seconds
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      {exerciseList.map((exercise, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex justify-between items-center"
        >
          {/* Left Section: Exercise Info */}
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

          {/* Right Section: Favorite and Add */}
          <div className="flex space-x-4 items-center">
            {/* Favorite Button */}
            <button
              onClick={() => toggleFavorite(exercise.id)}
              className="text-gray-400 hover:text-yellow-400 transition"
              title="Toggle Favorite"
            >
              <Star
                className={`w-6 h-6 ${
                  exercise.isFavorite ? "text-yellow-400" : "text-gray-400"
                }`}
              />
            </button>

            {showAddButton && onAddExercise && (
              <button
                onClick={() => onAddExercise(exercise)}
                className="text-blue-600 hover:text-blue-800 transition"
                title="Add Exercise"
              >
                <Plus className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExerciseOverviewTable;
