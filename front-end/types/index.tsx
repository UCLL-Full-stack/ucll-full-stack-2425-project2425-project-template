export type EventInput = {
    id?: number,
    name: string,
    description: string,
    date: Date;
    location: string,
    category: string,
    backgroundImage?: string,
    participants: ParticipantInput[],
};

export type ParticipantInput = {
    id?: number,
    user: UserInput,
};

export type UserInput = {
    id?: number,
    username: string,
    name: string,
    email: string,
    password: string,
    age: number,
    role: Role,
};

export type Role = 'participant' | 'organizer';