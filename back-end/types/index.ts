type CarInput = {
    id?: number;
    model: string;
    brand: string;
    year: number;
    licensePlate: string;
    price: number;
};
type CarPartInput = {
    id?: number;
    name: string;
    price: number;
    quantity: number;
};

export {
    CarInput,
    CarPartInput,
};