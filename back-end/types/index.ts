type Role = 'admin' | 'parent' | 'child';

type User = {
    name: string;
    email: string;
    password: string;
    role: Role;
}
export {
    Role,
    User,
}
