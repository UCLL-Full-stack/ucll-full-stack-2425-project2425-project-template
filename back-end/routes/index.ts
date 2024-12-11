import { Router } from 'express';
import productRoutes from './product.routes';

const rootRouter = Router();

rootRouter.use('/products', productRoutes);

export default rootRouter;
