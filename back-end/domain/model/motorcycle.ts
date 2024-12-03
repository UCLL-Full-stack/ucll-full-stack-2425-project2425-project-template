import { Vehicle } from "./vehicle";

export class Motorcycle extends Vehicle{
    constructor(motorcycle: {
        id?: number, 
        manufacturer: string,
        model_name: string, 
        price: number, 
        fuelType: string,
        transmissionType: string, 
        year: number, 
        vehicleType: string, 
        bodyType: string, 
        mileage: number,
        engineCapacity : number,
        createdAt? : Date,
        updatedAt? : Date
    }) {
        // this.validate(motorcycle);

        super({
            id: motorcycle.id,
            manufacturer: motorcycle.manufacturer, 
            model_name: motorcycle.model_name,
            price: motorcycle.price, 
            fuelType: motorcycle.fuelType,
            transmissionType: motorcycle.transmissionType,
            year: motorcycle.year, 
            vehicleType: motorcycle.vehicleType,
            bodyType: motorcycle.bodyType, 
            mileage: motorcycle.mileage,
            engineCapacity: motorcycle.engineCapacity,
            createdAt : motorcycle.createdAt,
            updatedAt : motorcycle.updatedAt
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
        return this.fuelType;
    }

    getTransmissionType(): string {
        return this.transmissionType;
    }

    getYear(): number {
        return this.year;
    }

    getVehicleType(): string {
        return this.vehicleType;
    }
}