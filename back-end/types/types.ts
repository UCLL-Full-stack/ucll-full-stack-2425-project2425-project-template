export type PlayerInput = {
    id?: number,
    name: string,
    position: string,
    birthdate: Date,
    number: number
}

export enum Role {
    ADMIN = 'admin',
    USER = 'user'
}

export enum Job {
    COACH = 'coach',
    ASSISTANT_COACH = 'assistant coach'
}

