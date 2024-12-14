import inviteDb from "../repository/invite.db";
import userDb from "../repository/user.db";
import eventDb from "../repository/event.db";
import { Invite } from "../model/invite";

const createInvite = async (userEmail: string, eventId: string): Promise<Invite> => {
    const userData = await userDb.getUserByEmail(userEmail);
    const event = await eventDb.getEventById(Number(eventId));

    if (!userData) {
        throw new Error('User not found.');
    }

    const invite = new Invite({
        status: 'PENDING',
        user: userData,
        event: event,
    })

    return inviteDb.createInvite(invite);
    
};

const getInvitesByEventId = async (eventId: string): Promise<Invite[]> => {
    const invites = await inviteDb.getInvitesByEventId(eventId);
    return invites;
};

const getInvitesByUserEmail = async (email: string): Promise<Invite[]> => {
    const invites = await inviteDb.getInvitesByUserEmail(email);
    return invites;
}

export default {
    createInvite,
    getInvitesByEventId,
    getInvitesByUserEmail,
};