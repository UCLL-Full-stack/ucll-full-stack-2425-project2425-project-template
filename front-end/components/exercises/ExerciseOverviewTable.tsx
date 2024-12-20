import ExerciseService from "@/services/exercise/ExerciseService";
import { Exercise } from "@/types";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [filter, setFilter] = useState("all");
  const [filteredExercises, setFilteredExercises] = useState(exercises);

  useEffect(() => {
    const filtered = exercises.filter((exercise) => {
      switch (filter) {
        case "favorites":
          return exercise.isFavorite;
        case "all":
        default:
          return true;
      }
    });

    setFilteredExercises(filtered);
  }, [filter, exercises]);

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
      {/* Filter Buttons */}
      <div className="mb-4 flex gap-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          All Exercises
        </button>
        <button
          onClick={() => setFilter("favorites")}
          className={`px-4 py-2 rounded ${
            filter === "favorites"
              ? "bg-yellow-400 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Favorites
        </button>
      </div>

      {/* Exercise List */}
      {filteredExercises.map((exercise, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg border border-gray-200 p-6 flex justify-between items-center mb-4"
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

      {/* If there are no exercises that match the filter */}
      {filteredExercises.length === 0 && (
        <p className="text-gray-500 text-center mt-6">
          {filter === "favorites"
            ? "No favorite exercises found."
            : "No exercises available."}
        </p>
      )}
    </div>
  );
};

export default ExerciseOverviewTable;
