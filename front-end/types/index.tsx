export type Vehicle = {
    id: number;
    manufacturer: string;
    model_name: string;
    year: number;
    price: number;
    fuel_type: string;
    transmission_type: string;
    vehicle_type: string;
    body_type: string;
    mileage: number
}

export type UserLogIn = {
    email: string;
    password: string;
}

export type UserSignUp = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}