import { Family } from "../model/family";
import familyDb from "../repository/family.db";


const getAllFamilies = async (): Promise<Family[]> => familyDb.getAllFamilies();


export default {
    getAllFamilies,
}