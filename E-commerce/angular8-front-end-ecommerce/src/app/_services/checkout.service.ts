import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http : HttpClient) { }

  chargeCard(token: string) {
    console.log("charge card => "+token)
    const headers = new HttpHeaders({'token': token, 'amount': '100'});
    this.http.post('http://localhost:6061/payment/charge', {}, {headers: headers})
      .subscribe(resp => {
        console.log(resp);
      })
  }
}
