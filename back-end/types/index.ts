import { id } from "date-fns/locale";

type SellerInput = {
    id?: number;
    email?: string;
    name?: string;
    phone_number?: number;
    list_of_cars?: VehicleInput[];
};

type VehicleInput = {
    id?: number;
    manufacturer?: string;
    model_name?: string;
    year?: number;
    price?: number;
    fuel_type?: string;
    transmission_type?: string;
    vehicle_type?: string;
    body_type?:string;
    mileage?:number;
    createdAt?:Date;
    updatedAt?:Date
};


export { SellerInput, VehicleInput }