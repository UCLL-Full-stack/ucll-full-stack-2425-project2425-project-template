export type User = {
    name?: string;
    email?: string;
    password?: string;
    role?: "user";
    birth_date?: Date;
    phone_number?: string;
};

export type productInput = {
    id?: number;
    name?: string;
    price?: number;
    description?: string;
    rating?: number;
    url?: string;
    reviews?: reviewsInput[];
};

export type reviewsInput = {
    id?: number;
    rating: number;
    text: string;
    createdAt?: Date;
    user: User;
};