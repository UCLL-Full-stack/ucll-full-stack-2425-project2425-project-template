type UserInput = {
    id?: number;
    username?: string;
    hashedPassword?: string;
    profile?: ProfileInput;
    groups?: GroupInput[];
    tasks?: TaskInput[];
};

type GroupInput = {
    id?: number;
    name?: string;
    description?: string;
    createdAt?: Date;
    users?: UserInput[];
    boards?: BoardInput[];
};

type BoardInput = {
    id?: number;
    name?: string;
    description?: string;
    createdAt?: Date;
    tasks?: TaskInput[];
};

type TaskInput = {
    id?: number;
    name?: string;
    description?: string;
    priority?: string;
    storyPoints?: number;
    startDate?: Date;
    endDate?: Date;
    users?: UserInput[];
};

type ProfileInput = {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    createdAt?: Date;
};