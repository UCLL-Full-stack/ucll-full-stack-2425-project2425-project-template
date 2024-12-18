type Role = 'admin' | 'user' | 'owner';

type UserInput = {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: Role;
    phone_number?: string;
    birth_date?: Date;
};

type AuthenticationResponse = {
    token: string;
    email: string;
    fullname: string;
};

export{
    Role,
    UserInput,
    AuthenticationResponse
};