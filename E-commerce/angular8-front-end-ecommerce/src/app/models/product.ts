import { Category } from './category';

export class Product {
    id:number;
    name:string;
    description:string;
    price:number;
    unitStock:number;
    imageURL:string; 
    imageURL2:string;
    imageKey:string;
    secendImageKey:string;
    category : Category;
    // constructor(productForm : any){
    //     this.name = productForm.name;
    //     this.description = productForm.description;
    //     this.unitStock = productForm.unitStock;
    //     this.price = productForm.price;
    //     this.imageURL= productForm.imageURL;
    //     this.imageURL2 = productForm.imageURL2;
    // }
}
