const getAllWorkouts = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/workouts",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
} 

const getWorkoutById = async (workoutId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/workouts/${workoutId}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            },
        })
}

export default {
    getAllWorkouts, getWorkoutById
}
