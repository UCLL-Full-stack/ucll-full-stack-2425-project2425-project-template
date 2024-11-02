import { User } from "../model/user";

type Role = 'admin' | 'parent' | 'child';

type UserInput = {
    name?: string;
    email?: string;
    password?: string;
    role?: Role;
}

type FamilyInput = {
    name?: string;
    familyList?: User[];
    owner?: User;
}

export {
    Role,
    UserInput,
    FamilyInput,
}
