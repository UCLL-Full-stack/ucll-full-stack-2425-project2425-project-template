export class Vehicle{
    readonly id?: number | undefined;
    readonly manufacturer: string;
    readonly model_name: string;
    readonly price: number;
    readonly fuel_type: string;
    readonly transmission_type: string;
    readonly year: number;
    readonly vehicle_type: string;

    constructor(vehicle: {
        id?: number, manufacturer: string,
        model_name: string, price: number, fuel_type: string, 
        transmission_type: string, year: number, vehicle_type: string
    }) {
        this.id == vehicle.id;
        this.manufacturer = vehicle.manufacturer;
        this.model_name = vehicle.model_name;
        this.price = vehicle.price;
        this.fuel_type = vehicle.fuel_type;
        this.transmission_type = vehicle.transmission_type;
        this.year = vehicle.year;
        this.vehicle_type = vehicle.vehicle_type;
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

    getTransmissionType(): string{
        return this.transmission_type
    }

    getYear(): number{
        return this.year
    }

    getVehicleType(): string{
        return this.vehicle_type
    }

}