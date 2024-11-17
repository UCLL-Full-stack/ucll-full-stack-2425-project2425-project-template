export type Vehicle = {
    id?: number;
    manufacturer: string;
    model_name: string;
    year: number;
    price: number;
    fuel_type: string;
    transmission_type: string;
    vehicle_type: string;
    body_type: string
}

export type User = {
    id?: number;
    name?: string;
    age?: number;
    email?: string;
    password?: string;
  };
  