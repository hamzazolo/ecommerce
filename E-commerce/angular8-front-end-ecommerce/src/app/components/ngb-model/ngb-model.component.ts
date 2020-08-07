import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/_services/cart.service';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-ngb-model',
  templateUrl: './ngb-model.component.html',
  styleUrls: ['./ngb-model.component.css']
})
export class NgbModelComponent implements OnInit {

  @Input() product :Product;

  constructor(public activeModal: NgbActiveModal, private cartService : CartService) { }

  ngOnInit() {
  }

  addToCart(product:Product){
    const cartItem = new CartItem(product);
     this.cartService.addToCart(cartItem);
  }

}
