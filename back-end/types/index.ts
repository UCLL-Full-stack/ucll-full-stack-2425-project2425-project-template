type Role = 'admin' | 'parent' | 'child';

type UserInput = {
    name?: string;
    email?: string;
    password?: string;
    role?: Role;
}
export {
    Role,
    UserInput,
}
