import { Workout } from "@/types";

type Props = {
  workout: Workout;
};

const WorkoutInfo: React.FC<Props> = ({ workout }: Props) => {
  return (
    <>
      {workout && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Workout Name</th>
                <th>id</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{workout.name}</td>
                <td>{workout.workout_id}</td>
                <td>{workout.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default WorkoutInfo;
