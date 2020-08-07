import { Product } from './product';

export class CartItem {

    id:number;
    name:string;
    description:string;
    price:number;
    quantity:number;
    imageURL:string;

    constructor(product : Product){
        this.id = product.id;
        this.name = product.name;
        this.imageURL = product.imageURL;
        this.price = product.price;
        this.quantity = 1;
    }
}
