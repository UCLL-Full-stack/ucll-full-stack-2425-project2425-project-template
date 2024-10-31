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
                <th>Name</th>
                <th>Description</th>
                <th>Video</th>
              </tr>
            </thead>
            <tbody>
              {workout.exercises.map((exercise) => (
                <tr key={exercise.id}>
                  <td>{exercise.name}</td>
                  <td>{exercise.description}</td>
                  <td>{exercise.video_link}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default WorkoutInfo;
