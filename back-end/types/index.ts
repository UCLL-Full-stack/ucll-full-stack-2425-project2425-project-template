interface productInput{
    name:string;
    price:number;
    unit:string;
    stock:number;
    description:string;
    imagePath:string;
}

interface cartInputs{
    Id?:number | undefined;
    totalPrice:number;
}

interface customerInput{
     id?: undefined | number;
     password: string;
     securityQuestion: string;
     username: string;
     firstName: string;
     lastName: string;
     phone: number;
}

interface orderInput{
    cartId?:undefined | number;
    date:Date;
}

export{
    productInput,
    cartInputs,
    customerInput,
    orderInput
}