import { Invite } from '../model/invite';
import { User } from '../model/user';
import database from './database';


const createInvite = async (invite: Invite): Promise<Invite> => {
    const invitePrisma = await database.invite.create({
        data: {
            status: 'PENDING',
            user: {
                connect: {
                    id: invite.getUser().getId(),
                },
            },
            event: {
                connect: {
                    id: invite.getEvent().getId(),
                },
            },
        },
        include: {
            user: true,
            event: true,
        },
    });

    return Invite.from(invitePrisma);
};

const getInvitesByEventId = async (eventId: string): Promise<Invite[]> => {
    const invitesPrisma = await database.invite.findMany({
        where: {
            eventId: Number(eventId),
        },
        include: {
            user: true,
            event: true,
        },
    });

    return invitesPrisma.map(Invite.from);
};

const getInvitesByUserEmail = async (email: string): Promise<Invite[]> => {
    const userPrisma = await database.user.findUnique({
        where: {
            email,
        },
    });

    if (!userPrisma) {
        throw new Error('User not found.');
    }

    const invitesPrisma = await database.invite.findMany({
        where: {
            userId: userPrisma.id,
        },
        include: {
            user: true,
            event: true,
        },
    });

    return invitesPrisma.map(Invite.from);
}

export default {
    createInvite,
    getInvitesByEventId,
    getInvitesByUserEmail,
};
