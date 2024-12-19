import { Workout } from "@/types";
import { useState } from "react";
import Modal from "./Modal";
import WorkoutService from "@/services/workout/WorkoutService";

type Props = {
  workouts: Array<Workout>;
  // setWorkouts: (workouts: Array<Workout>) => void;
};

const WorkoutOverviewTable: React.FC<Props> = ({ 
  workouts 
}) => {
  return (
    <div className="space-y-6">
      {workouts.map((workout, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg border border-gray-200 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800">
            {workout.name}
          </h2>
          <p className="text-sm text-gray-600 mt-2">{workout.description}</p>
        </div>
      ))}
    </div>
  );
};

export default WorkoutOverviewTable;
