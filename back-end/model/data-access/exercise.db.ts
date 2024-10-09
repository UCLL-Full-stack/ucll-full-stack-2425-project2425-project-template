import { Exercise } from "../exercise";

const exercises: Exercise[] = [
    new Exercise({id: 1, name: 'push-up', description: 'lorem ipsum', video_link: 'https://youtu.be/IODxDxX7oi4?si=r9RqbT14IBF6aI5X'}),
    new Exercise({id: 2, name: 'dips', description: 'lorem ipsum', video_link: 'https://youtu.be/yN6Q1UI_xkE?si=DFFTgnjpAAIR-diV'})
]

const getAllExercises = (): Exercise[] => {
    return exercises;
}

const getExerciseById = (id: number): Exercise => {
    const exercise = exercises.find((exercise) => exercise.id == id);
    if (!exercise) {
        throw new Error(`Exercise with id ${id} not found`)
    }
    return exercise;
}

export default {getAllExercises, getExerciseById}