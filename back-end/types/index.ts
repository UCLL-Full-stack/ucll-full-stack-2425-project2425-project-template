type Role = 'participant' | 'organizer';

type EventInput = {
    id?: number,
    name: string,
    description: string,
    date: Date;
    location: string,
    category: string,
    backgroundImage?: string,
    isTrending: boolean,
};

type UserInput = {
    id?: number,
    username: string,
    name: string,
    email: string,
    password: string,
    age: number,
    role: Role,
};

type OrganizerInput = {
    id?: number,
    user: UserInput,
    organizationName: string,
    organizationPass: string,
};

type ParticipantInput = {
    id?: number,
    user: UserInput,
};

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
    OrganizerInput,
    ParticipantInput,
    InviteInput,
    TicketInput,
};