import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {

  cartItems:CartItem[]=[];
  totalPrice : number = 0;
  totalQuantity : number = 0;

  constructor(private cartService:CartService) { }

  ngOnInit() {
    this.cartDetails();
  }

  cartDetails(){
    this.cartItems=this.cartService.cartItems;

    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice =totalPrice
    )
    this.cartService.totalQuantity.subscribe(
      totalQ => this.totalQuantity = totalQ
    )

    this.cartService.calculateTotalPrice();
  }

  incrementQuantity(cartItem : CartItem){
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(cartItem : CartItem){
    this.cartService.decrementQuantity(cartItem)
  }
  
  remove(cartItem:CartItem){
    
    this.cartService.remove(cartItem);
  }
}
