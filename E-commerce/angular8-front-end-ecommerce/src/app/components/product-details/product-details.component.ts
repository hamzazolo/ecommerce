import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/_services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();
 
  constructor(private _activeRoute: ActivatedRoute, private productService: ProductService,
             private cartService : CartService, private toaster:ToastrService) { }

  ngOnInit() {
    this._activeRoute.paramMap.subscribe(
      () => this.getProductDetails()
    );
  }

  getProductDetails() {
    const id: number = +this._activeRoute.snapshot.paramMap.get("id");
    this.productService.getProduct(id).subscribe(
      data => {
        this.product = data;
        console.log("data => "+data)
      },err=>{
        this.toaster.error("Error communication with server")
      }
    )
  }

  addToCart(product:Product){
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }

}
