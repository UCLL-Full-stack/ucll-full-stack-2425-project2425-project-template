import { Workout } from "@/types";
import { useState } from "react";
import WorkoutInfo from "./WorkoutInfo";
import { Plus } from "react-feather";
import Modal from "./Modal";

type Props = {
  workouts: Array<Workout>;
};

const WorkoutOverviewTable: React.FC<Props> = ({ workouts }: Props) => {
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleWorkout = (workoutId: number) => {
    setSelectedWorkoutId(selectedWorkoutId === workoutId ? null : workoutId);
  };

  const handleAddNewWorkout = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitWorkout = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("New workout submitted, but not implemented yet.");
    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      {workouts.map((workout) => (
        <div
          key={workout.workout_id}
          className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden"
        >
          <div
            onClick={() => toggleWorkout(workout.workout_id)}
            className="px-6 py-4 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {workout.name}
            </h2>
            <p className="text-sm text-gray-600">{workout.description}</p>
          </div>
          {selectedWorkoutId === workout.workout_id && (
            <div className="px-6 pb-4">
              <WorkoutInfo workout={workout} />
            </div>
          )}
        </div>
      ))}
      <div
        className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-md rounded-lg border border-blue-300 cursor-pointer hover:shadow-lg hover:border-blue-400 transition-all flex justify-center items-center py-4"
        onClick={handleAddNewWorkout}
      >
        <div className="flex items-center space-x-2">
          <Plus className="text-blue-600 w-6 h-6" />
          <span className="text-blue-600 font-medium">Add New Workout</span>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-bold mb-4">Add New Workout</h2>
        <form onSubmit={handleSubmitWorkout}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Workout Name
            </label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              rows={3}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default WorkoutOverviewTable;
