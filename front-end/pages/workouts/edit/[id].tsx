import { useRouter } from "next/router";
import Header from "@/components/header";
import EditWorkout from "@/components/workouts/EditWorkout";

const EditWorkoutPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== "string") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Invalid workout ID.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-screen-md mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Edit Workout</h1>
        <EditWorkout workoutId={id} />
      </div>
    </>
  );
};

export default EditWorkoutPage;
