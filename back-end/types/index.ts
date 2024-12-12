type Role = 'User' | 'Admin' | 'Mod';

type UserInput = {
    id?: number;
    userName: string;
    email: string;
    role: Role;
    password: string;
};

type CategoryInput = {
    id?: number;
    name: string;
    description: string;
};

type LocationInput = {
    id?: number;
    street: string;
    number: number;
    city: string;
    country: string;
};

type EventInput = {
    id?: number;
    name: string;
    date: Date;
    price: number;
    minParticipants: number;
    maxParticipants: number;
    location: LocationInput;
    category: CategoryInput;
};

type ProfileInput = {
    id?: number;
    firstName: string;
    lastName: string;
    age: number;
    category: CategoryInput;
    location: LocationInput;
};
type AuthenticationResponse = {
    token: string;
    userName: string;
    role: Role;
};
type AuthenticationInput = {
    userName: string;
    role: Role;
    password: string;
};

export {
    Role,
    UserInput,
    CategoryInput,
    LocationInput,
    EventInput,
    ProfileInput,
    AuthenticationResponse,
    AuthenticationInput,
};
