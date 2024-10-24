type Role = 'admin' | 'user';

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

type EventInput = {
    id?: string;
    name: string;
    date: Date;
    price: number;
    minParticipants: number;
    maxParticipants: number;

    };

type LocationInput = {
    id?: string;
    street: string;
    number: number;
    city: string;
    country: string;
    };

type ProfileInput = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    administrator: boolean;
    };
