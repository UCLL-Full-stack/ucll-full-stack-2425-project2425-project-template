import { Order } from "../model/order";
import { Part } from "../model/part";
import { User } from "../model/user";


type UserInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    address: string;
    orders: Order[];
}

type PartInput = {
    id?: number;
    name: string;
    brand: string;
    type: string;
    price: number;
}

type OrderInput = {
    id?: number;
    price: number;
    orderStatus: string;
    orderDate: Date;
    userId: number;
}

type BuildInput = {
    id?: number;
    parts: Part[];
    price: number;
    preBuild: boolean;
}

export {
    UserInput,
    PartInput,
    OrderInput,
    BuildInput,
}