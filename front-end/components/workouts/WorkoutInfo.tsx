import { Workout } from "@/types";
import Link from "next/link";
import { Plus } from "react-feather";

type Props = {
  workout: Workout;
};

const WorkoutInfo: React.FC<Props> = ({ workout }: Props) => {
  return (
    <>
      {workout && (
        <div className="mt-4 bg-white p-6 shadow-md rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{workout.name}</h2>
            <Link href="/exercises">
              <button className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Plus className="mr-2" /> Add Exercises
              </button>
            </Link>
          </div>
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
