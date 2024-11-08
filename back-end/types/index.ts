type Role = 'participant' | 'organizer';

type UserInput = {
    id?: number,
    username: string,
    name: string,
    email: string,
    password: string,
    age: number,
    role: Role,
};

// type ParticipantInput = {
//     id?: number,
//     user: UserInput,
//     events: EventInput[],
// };

type EventInput = {
    id?: number,
    name: string,
    description: string,
    date: Date;
    location: string,
    category: string,
    backgroundImage?: string,
    users: UserInput[],
    isTrending: boolean,
};

// type OrganizerInput = {
//     id?: number,
//     user: UserInput,
//     organizationName: string,
//     organizationPass: string,
// };

type InviteInput = {
    id?: number,
    status: 'pending' | 'confirmed' | 'declined',
    email: string,
};

type TicketInput = {
    id?: number,
    type: 'VIP' | 'Regular',
    cost: number,
};

export {
    Role,
    EventInput,
    UserInput,
    // OrganizerInput,
    // ParticipantInput,
    InviteInput,
    TicketInput,
};