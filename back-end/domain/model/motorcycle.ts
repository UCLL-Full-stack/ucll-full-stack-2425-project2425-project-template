import { Vehicle } from "./vehicle";

export class Motorcycle extends Vehicle{
    constructor(motorcycle: {
        id?: number, manufacturer: string,
        model_name: string, price: number, fuel_type: string,
        transmission_type: string, year: number, vehicle_type: string
    }) {
        // this.validate(motorcycle);

        super({
            id: motorcycle.id, manufacturer: motorcycle.manufacturer, model_name: motorcycle.model_name,
            price: motorcycle.price, fuel_type: motorcycle.fuel_type,
            transmission_type: motorcycle.transmission_type,
            year: motorcycle.year, vehicle_type: motorcycle.vehicle_type,
            body_type: ""
        });

    }

    getId(): number | undefined {
        return this.id;
    }

    getManufacturer(): string {
        return this.manufacturer;
    }

    getModelName(): string {
        return this.model_name;
    }

    getPrice(): number {
        return this.price;
    }

    getFuelType(): string {
        return this.fuel_type;
    }

    getTransmissionType(): string {
        return this.transmission_type;
    }

    getYear(): number {
        return this.year;
    }

    getVehicleType(): string {
        return this.vehicle_type;
    }
}