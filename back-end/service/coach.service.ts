import { get } from "http";
import { CoachInput } from "../types";
import coachDB from "../repository/coach.db";

const getAllCoaches = async () => {
    const coaches = await coachDB.getAllCoaches();
    return coaches;
};

export default {
    getAllCoaches,
};