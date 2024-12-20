type UserInput = {
    id?: number;
    username: string;
    email: string;
    password: string;
};

export {
    UserInput
}

export interface Review {
    movieId: number;
    userId: number;
    reviewText: string;
    rating: number;
}