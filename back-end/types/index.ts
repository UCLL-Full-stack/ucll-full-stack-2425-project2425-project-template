type UserInput = {
    name: string;
    email: string;
    password: string;
    birthday: Date;
};

type AuthInput = {
    email: string;
    password: string;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    role: string;
};

export { UserInput, AuthInput, AuthenticationResponse };
