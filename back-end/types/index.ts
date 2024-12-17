type Role = 'admin' | 'user';

type UserInput = {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: Role;
    phone_number?: string;
    birth_date?: Date;
};

export{
    Role,
    UserInput
};