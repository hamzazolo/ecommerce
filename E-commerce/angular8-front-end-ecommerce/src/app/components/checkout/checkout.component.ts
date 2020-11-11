import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/_services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private checkoutService : CheckoutService) { }

  ngOnInit() {
  }


  chargeCreditCard() {
    let form = document.getElementsByTagName("form")[0];
    (<any>window).Stripe.card.createToken({
      number: form.cardNumber.value,
      exp_month: form.expMonth.value,
      exp_year: form.expYear.value,
      cvc: form.cvc.value
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        this.checkoutService.chargeCard(token);
      } else {
        console.log(response.error.message);
      }
    });
  }
}
