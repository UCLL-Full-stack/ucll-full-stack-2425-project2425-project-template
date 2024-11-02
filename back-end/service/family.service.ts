import { Family } from "../model/family";
import familyDb from "../repository/family.db";
import { FamilyInput } from "../types";
import userService from "./user.service";


const getAllFamilies = async (): Promise<Family[]> => familyDb.getAllFamilies();

const createFamily = async ({name, familyList, owner}: FamilyInput): Promise<Family> => {
    if (!name) throw new Error ("familyName is required.");
    if (!familyList) throw new Error ("list of familymembers is required.")
    if (!owner) throw new Error ("owner of family is required.")
    
    const family = new Family({name,familyList,owner});
    familyDb.createFamily(family);

    return family
}

export default {
    getAllFamilies,
    createFamily,
}