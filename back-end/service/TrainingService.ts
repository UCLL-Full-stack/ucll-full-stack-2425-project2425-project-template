import { Training } from "../model/Training";
import { TrainingInput } from "../types";

const createTraining = async ({
    trainingId,
    date,
    hall,
    square,
    players,
    coach
}: TrainingInput): Promise<Training> => {
    const training = new Training ({
        trainingId,
        date,
        hall,
        square,
        players,
        coach
    })
    return training;
}

export default {
    createTraining,
}