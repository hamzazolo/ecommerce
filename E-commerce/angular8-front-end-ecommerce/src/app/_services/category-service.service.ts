import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  baseUrl = "http://localhost:6061/api/category";
  constructor(private http:HttpClient) { }

  public getCategories(){
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }
  public getCategoryById(id : number){
    return this.http.get<Category>(`${this.baseUrl}/categories/${id}`);
  }

  
  public saveCategory(category : Category){
    return this.http.post<Category>(`${this.baseUrl}/saveCategory`,category);
  }

  public updateCategory(category : Category){
    return this.http.put<Category>(`${this.baseUrl}/updateCategory`,category);
  }

  public deleteCategory(id : number){
    return this.http.delete<any>(`${this.baseUrl}/deleteCategory/${id}`);
  }
  
}
