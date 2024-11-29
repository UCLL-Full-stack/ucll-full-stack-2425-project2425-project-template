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
    InviteInput,
    TicketInput,
};