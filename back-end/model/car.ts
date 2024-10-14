import { Vehicle } from "./vehicle";

export class Car extends Vehicle{

    constructor(car: {
        id?: number, manufacturer: string,
        model_name: string, price: number, fuel_type: string, transmission_type: string, year: number
    }) {
        // this.validate(car);

        super({id: car.id, manufacturer: car.manufacturer, model_name: car.model_name, price: car.price, 
            fuel_type: car.fuel_type, transmission_type: car.transmission_type, year: car.year});
        
    }
    // validate(car: { id?: number; manufacturer: string; model_name: string; 
    //     price: number; fuel_type: string; transmission_type: string; year: number; }) {
        
    // }


}