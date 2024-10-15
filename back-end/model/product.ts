import { productInput } from "../types";

export class Products{
    private name:string;
   private price:number;
    private unit:string;
    private stock:number;
    private description:string;
    private imagePath:string;

    constructor({name,price,unit,stock,description,imagePath}:productInput){
        this.name = name;
        this.price = price;
        this.description = description;
        this.imagePath = imagePath;
        this.stock = stock;
        this.unit = unit;
    }

    public getName():string{
        return this.name
    }
    public getPrice():number{
        return this.price;
    }
    public getUnit():string{
        return this.unit
    }
    public getStock(){
        return this.stock
    }
    public getDescription(){
        return this.description
    }
    public getImagePath():string{
        return this.imagePath
    }

    equal(newProduct:Products){
        return(
            newProduct.name === this.name&&
            newProduct.price === this.price&&
            newProduct.unit === this.unit&&//the equals method just checks if the data types of each attribute is the same as defined in the constructor            newProduct.stock === this.stock&&
            newProduct.description === this.description&&
            newProduct.imagePath === this.imagePath
        )
    }
}