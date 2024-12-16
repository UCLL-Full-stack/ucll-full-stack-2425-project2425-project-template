import { id } from "date-fns/locale";

// type SellerInput = {
//     id?: number;
//     email?: string;
//     name?: string;
//     phone_number?: number;
//     list_of_cars?: VehicleInput[];
// };

type UserInput = {
    id?: number;
    email?: string;
    name?: string;
    password?: string;
    phone_number?: number;
    listOfCarsForSelling?: VehicleInput[];
    list_of_favorite_cars?: VehicleInput[];
};

type VehicleInput = {
    id?: number;
    manufacturer?: string;
    model_name?: string;
    year?: number;
    price?: number;
    fuelType?: string;
    engineCapacity? : number;
    transmissionType?: string;
    vehicleType?: string;
    bodyType?:string;
    mileage?:number;
    createdAt?: Date;
    updatedAt?:Date
};


export { UserInput, VehicleInput }