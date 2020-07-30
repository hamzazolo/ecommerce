import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();
  constructor(private _activeRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this._activeRoute.paramMap.subscribe(
      () => this.getProductDetails()
    );
  }

  getProductDetails() {
    const id: number = +this._activeRoute.snapshot.paramMap.get("id");
    this.productService.getProduct(id).subscribe(
      data => this.product = data
    )
  }

  addToCart(){
    
  }

}
