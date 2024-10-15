import { orderInput } from "../types";

export class Order{
    private cartId?:number | undefined;
    private date:Date;
    
    constructor({cartId,date}:orderInput){
        this.cartId = cartId
        this.date = date
    }

    public getCartId():number | undefined{
        return this.cartId
    }
    public getDate():Date{
        return this.date
    }

    equals(newOrder:Order){
        return(
            newOrder.cartId === this.cartId &&
            newOrder.date === this.date
        )
    }
}