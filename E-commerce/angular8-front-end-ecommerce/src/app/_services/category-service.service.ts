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

  
}
