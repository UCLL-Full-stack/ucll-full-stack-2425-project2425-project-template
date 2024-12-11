import productService from '../service/product.service';
import { Request, Response } from 'express';
// import { Product } from '../types';

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await productService.getProducts();
        res.json(products);
    } catch (error) {
        console.error(error);
    }
};
