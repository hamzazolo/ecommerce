import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json;multi-part/form-data'})
    
};

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

  getAllProducts(){
    return this.http.get<Product[]>(`${this.baseUrl}/getAllProducts`);
  }

  public addProduct(data){
    return this.http.post<any>(`${this.baseUrl}/saveProduct`,data );
  }

  public updateProduct(data){
    return this.http.put<any>(`${this.baseUrl}/updateProduct`,data);
  }

  public deleteProduct(id:number){
    return this.http.delete<any>(`${this.baseUrl}/removeProduct/${id}`)
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