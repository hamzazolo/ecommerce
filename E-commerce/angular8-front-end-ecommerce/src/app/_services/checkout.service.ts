import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sales } from '../models/sales';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http : HttpClient) { }

  chargeCard(sale:Sales) {
   
   // const headers = new HttpHeaders({'token': token });
    return this.http.post<any>('http://localhost:6061/payment/charge', sale)
  }
}
