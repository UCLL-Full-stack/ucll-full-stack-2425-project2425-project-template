export type Permission = 'ADMIN' | 'USER' | 'GUEST';

export type UserInput = {
    username: string;
    password: string;
    name: string;
    surname: string;
    email: string;
    permission: Permission;
    id?: number;
};

export type AuthenticationResponse = {
    token: string;
    username: string;
};