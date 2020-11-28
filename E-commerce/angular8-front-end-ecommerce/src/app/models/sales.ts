import { Address } from './address';

export class Sales {
    email : string;
    phone:string;
    cardNumber:string;
    firstName:string;
    lastName:string;
    expiryYear:number;
    expiryMonth:number;
    cvc:number;
    amount: number;
    currency:string;
    address:Address;
    token:string;
}
