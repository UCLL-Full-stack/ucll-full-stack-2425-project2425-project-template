type UserRole = "Salesman" | "Manager" | "Admin";

type AuthenticationResponse = {
    token: string;
    email: string;
    role: string;
};

type CarInput = {
    id?: number;
    model: string;
    brand: string;
    year: number;
    licensePlate: string;
    price: number;
};

type UserInput = {
    id?: number;
    name: string;
    password: string;
    email: string;
    role: UserRole;
};
export {
    AuthenticationResponse,
    CarInput,
    UserInput,
    UserRole
};