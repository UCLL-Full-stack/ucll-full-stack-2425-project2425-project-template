import { Vehicle } from "./vehicle";

export class Car extends Vehicle {

    constructor(car: {
        id?: number, 
        manufacturer: string,
        model_name: string,
        price: number, 
        fuel_type: string,
        transmission_type: string, 
        year: number, 
        vehicle_type: string, 
        body_type: string, 
        mileage: number,
        engineCapacity: number,
        createdAt : Date
        updatedAt : Date
    }) {
        // this.validate(car);

        super({
            id: car.id, 
            manufacturer: car.manufacturer, 
            model_name: car.model_name, 
            price: car.price,
            fuel_type: car.fuel_type, 
            transmission_type: car.transmission_type, 
            year: car.year, 
            vehicle_type: car.vehicle_type,
            body_type: car.body_type, 
            mileage: car.mileage,
            engineCapacity : car.engineCapacity,
            createdAt : car.createdAt,
            updatedAt : car.updatedAt

        });

    }
    // validate(car: { id?: number; manufacturer: string; model_name: string; 
    //     price: number; fuel_type: string; transmission_type: string; year: number; }) {

    // }
}