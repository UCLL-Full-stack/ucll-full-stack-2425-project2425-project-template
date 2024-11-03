import { Part } from "../model/part";

const parts = [
    new Part({ id: 1, name: 'Ryzen 5600X', brand: 'AMD', type: 'CPU', price: 150}),
    new Part({ id: 2, name: 'Ryzen 7600X', brand: 'AMD', type: 'CPU', price: 220}),
    new Part({ id: 3, name: 'Ryzen 7800X', brand: 'AMD', type: 'CPU', price: 320}),
    new Part({ id: 4, name: 'Ryzen 9800X', brand: 'AMD', type: 'CPU', price: 400}),
    new Part({ id: 5, name: 'Geforce RTX4060', brand: 'Nvidia', type: 'GPU', price: 300}),
    new Part({ id: 6, name: 'Geforce RTX4090', brand: 'Nvidia', type: 'CPU', price: 1000}),
]

const getAllParts = (): Part[] => parts;

const getPartById = ({ id }: { id: number }): Part | null => {
    return parts.find((part) => part.getId() === id) || null;
};

export default {
    getAllParts,
    getPartById,
}