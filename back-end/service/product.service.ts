import { UnauthorizedError } from "express-jwt";
import { Product } from "../model/product";
import productDb from "../repository/product.db";
import { Role, productInput } from "../types";

const getAllProducts = async (): Promise<Product[]> => productDb.getAllproducts();

const getProductById = ({id}: {id:number}): Promise<Product | null> => {
   const product = productDb.getProductById({id:id});
   if (!product) {
       throw new Error(`Product with id ${id} does not exist.`)
   }
   return product;
}

const getProductByName= async (name : string) : Promise<Product | null> => {
    
    const product = productDb.getProductByName(name);
    if(!product){
        throw new Error(`Product with name ${name} does not exist.`)
    }
    return product;
}
    

const createProduct = async ({name,price,description,rating,url}: productInput, role: Role): Promise<Product> => {

    if(role !== "owner"){
        throw new UnauthorizedError('credentials_required',{
            message: 'You are not authorized',
        });
    }
    if (!name) {
        throw new Error("Name is required");
    }
    if (!price) {
        throw new Error("Price is required")
    }
    if (!description) {
        throw new Error("Description is required")
    }
    if (!rating) {
        throw new Error("Rating is required")
    }
    const existingProductByName = await getProductByName(name);
    if (existingProductByName) {
        throw new Error(`Product with Product name "${name}" already exists.`);
    }

    const product = new Product({name,price,description,rating,url});
    const createdProduct = await productDb.createProduct(product);

    return createdProduct;


}



export default { getAllProducts,getProductById,createProduct };
