import { Workout } from "@/types";
import { useState } from "react";
import WorkoutInfo from "./WorkoutInfo";

type Props = {
  workouts: Array<Workout>;
};

const WorkoutOverviewTable: React.FC<Props> = ({ workouts }: Props) => {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const handleRowClick = (workout: Workout) => {
    setSelectedWorkout(workout);
  };
  return (
    <>
      {workouts && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(workout)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{workout.name}</td>
                  <td>{workout.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedWorkout && (
        <div>
          <WorkoutInfo workout={selectedWorkout} />
        </div>
      )}
    </>
  );
};

export default WorkoutOverviewTable;
