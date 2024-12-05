type Role = 'User' | 'Admin';

type UserInput = {
    id?: string;
    userName: string;
    email: string;
    role: Role;
    password: string;
};

type CategoryInput = {
    id?: string;
    name: string;
    description: string;
};

type LocationInput = {
    id?: string;
    street: string;
    number: number;
    city: string;
    country: string;
};

type EventInput = {
    id?: string;
    name: string;
    date: Date;
    price: number;
    minParticipants: number;
    maxParticipants: number;
    location: LocationInput;
    category: CategoryInput;
};

type ProfileInput = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    administrator: boolean;
};
type AuthenticationResponse = {
    token: string;
    username: string;
    role: Role;
};

export {
    Role,
    UserInput,
    CategoryInput,
    LocationInput,
    EventInput,
    ProfileInput,
    AuthenticationResponse,
};
