import { Participant } from "../model/participant";
import participantDb from "../repository/participant.db";

const getParticipantByEmail = (email: string): Participant => {
    const participant = participantDb.getParticipantByEmail(email);

    if (!participant) {
        throw new Error(`Participant with email ${email} not found`);
    };

    return participant;
};

export default {
    getParticipantByEmail,
};