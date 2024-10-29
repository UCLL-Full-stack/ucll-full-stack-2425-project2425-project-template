import { Workout } from "@/types";

type Props = {
  workouts: Array<Workout>;
};

const WorkoutOverviewTable: React.FC<Props> = ({ workouts }: Props) => {
  return (
    <>
      {workouts && (
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, index) => (
              <tr key={index}>
                <td>{workout.name}</td>
                <td>{workout.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default WorkoutOverviewTable;
