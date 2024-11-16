type UserInput = {
    id?: string;
    username: string;
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

export { UserInput, CategoryInput, LocationInput, EventInput, ProfileInput };
