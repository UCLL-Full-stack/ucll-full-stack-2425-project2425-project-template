import carPartDb from "../repository/carPart.db";
import { CarPart } from "../model/CarPart";
import { CarPartInput } from "../types";

const getAllCarParts = async (): Promise<CarPart[]> => carPartDb.getAllCarParts();

export default {getAllCarParts};