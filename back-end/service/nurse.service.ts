import { Nurse } from '../model/nurse'; // Import the Nurse model
import nurseDb from '../repository/nurse.db';

// Function to get nurse by id
const getNurseByEmail = async (email: string): Promise<Nurse | null> => {
    // Call the database method to get nurse by id
    const nurse = await nurseDb.getNurseByEmail(email)
    return nurse;  // If the nurse exists, return it; otherwise, return null
};

export default {
    getNurseByEmail,  // Export the new service function
};
