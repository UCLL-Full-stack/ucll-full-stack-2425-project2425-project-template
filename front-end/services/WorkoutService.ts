const getAllWorkouts = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/workouts",{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
} 

export default {
    getAllWorkouts,
}
