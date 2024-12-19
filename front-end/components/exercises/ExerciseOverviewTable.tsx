import { Exercise } from "@/types";
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
  return (
    <div className="space-y-6">
      {exercises.map((exercise, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg border border-gray-200 p-6"
        >
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
          {showAddButton && onAddExercise && (
            <button
              onClick={() => onAddExercise(exercise)}
              className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="mr-2" /> Add to Workout
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExerciseOverviewTable;
