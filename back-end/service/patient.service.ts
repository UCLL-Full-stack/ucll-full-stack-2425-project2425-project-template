import { Patient } from "../domain/model/patient";
import patientDb from "../domain/data-access/patient.db";

const getPatients = async (): Promise<Patient[]> => await patientDb.getAllPatientsFromDB();

export default {
    getPatients
}