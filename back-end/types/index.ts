type UserInput = {
    name: string;
    email: string;
    password: string;
    birthday: Date;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    role: string;
};

export { UserInput, AuthenticationResponse };
