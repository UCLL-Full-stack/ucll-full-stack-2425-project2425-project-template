import express, { NextFunction, Request, Response } from 'express';
import productService from '../service/product.service';


const productRouter = express.Router();


productRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const products = await productService.getAllProducts();
        res.status(200).json(products);

    }catch(error){
        next(error);
    }
});

export { productRouter };