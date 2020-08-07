import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:6061/api/product";

  constructor(private http:HttpClient) { }

  public getProductById( categortId:number , page?:number , size?:number){
    const query = `${this.baseUrl}/products?id=${categortId}&page=${page}&size=${size}`;
    return this.http.get<GetProductResponse>(query);
  }

  public getProducts(page:number, size:number){
    const query =`${this.baseUrl}/allProducts?page=${page}&size=${size}`;
    return this.http.get<GetProductResponse>(query);
  }

  getProduct(id:number){
    return this.http.get<Product>(`${this.baseUrl}/getProduct?id=${id}`);
  }

  
}
interface GetProductResponse{
  content :{
    products :Product[];
  },
  totalElements:number,
  totalPages : number,
  size:number,
  number:number,
  
}