import { Workout } from "@/types";

type Props = {
  workout: Workout;
};

const WorkoutInfo: React.FC<Props> = ({ workout }: Props) => {
  return (
    <>
      {workout && (
        <div className="mt-10 bg-white p-6 shadow-md rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-4">{workout.name}</h2>
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-2 font-semibold text-gray-600">Name</th>
                <th className="py-2 font-semibold text-gray-600">
                  Description
                </th>
                <th className="py-2 font-semibold text-gray-600">Video</th>
              </tr>
            </thead>
            <tbody>
              {workout.exercises.map((exercise) => (
                <tr key={exercise.id} className="border-b border-gray-200">
                  <td className="py-2">{exercise.name}</td>
                  <td className="py-2">{exercise.description}</td>
                  <td className="py-2">
                    <a
                      href={exercise.video_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Watch Video
                    </a>
                  </td>
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
