import database from "../../util/databases";
import { Patient } from "../model/patient";

const getAllPatientsFromDB = async (): Promise<Patient[]> => {
    try{
        const patientPrisma = await database.patient.findMany();
        return patientPrisma.map((patientPrisma) => Patient.from(patientPrisma))
    } catch(error){
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllPatientsFromDB
}