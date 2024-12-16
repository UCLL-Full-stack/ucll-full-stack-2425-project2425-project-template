export type Vehicle = {
    id: number;
    manufacturer: string;
    model_name: string;
    year: number;
    price: number;
    fuelType: string;
    engineCapacity : number;
    transmissionType: string;
    vehicleType: string;
    bodyType:string;
    mileage:number;
}

export type UserLogIn = {
    email: string;
    password: string;
}

export type UserSignUp = {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}