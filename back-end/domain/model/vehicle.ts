export class Vehicle{
    
    readonly id?: number | undefined;
    readonly manufacturer: string;
    readonly model_name: string;
    readonly price: number;
    readonly fuel_type: string;
    readonly transmission_type: string;
    readonly year: number;
    readonly body_type: string;
    readonly vehicle_type: string;
    readonly mileage: number;
    readonly engineCapacity : number;
    readonly createdAt? : Date;
    readonly updatedAt? : Date

    constructor(vehicle: {
        id?: number, manufacturer: string,
        model_name: string, price: number, fuel_type: string, body_type: string,
        transmission_type: string, year: number, vehicle_type: string, mileage: number, engineCapacity: number, createdAt? : Date, updatedAt?: Date
    }) {
        this.id = vehicle.id;
        this.manufacturer = vehicle.manufacturer;
        this.model_name = vehicle.model_name;
        this.price = vehicle.price;
        this.fuel_type = vehicle.fuel_type;
        this.body_type = vehicle.body_type;
        this.transmission_type = vehicle.transmission_type;
        this.year = vehicle.year;
        this.vehicle_type = vehicle.vehicle_type;
        this.mileage = vehicle.mileage;
        this.engineCapacity = vehicle.engineCapacity;
        this.createdAt = vehicle.createdAt;
        this.updatedAt = vehicle.updatedAt
    }


    getId() : number | undefined{
        return this.id
    }
    
    getManufacturer() : string{
        return this.manufacturer
    }

    getModelName(): string{
        return this.model_name
    }

    getPrice(): number{
        return this.price
    }

    getFuelType(): string{
        return this.fuel_type
    }

    getMileage(): number{
        return this.mileage
    }

    getTransmissionType(): string{
        return this.transmission_type
    }

    getYear(): number{
        return this.year
    }

    getVehicleType(): string{
        return this.vehicle_type
    }

    getVehicleBodyType(): string {
        return this.body_type
    }

}