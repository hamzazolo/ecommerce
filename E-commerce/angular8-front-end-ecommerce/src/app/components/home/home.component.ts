import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/_services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products : Product[];
  currentPage : number = 1;
  pageSize : number = 5;
  totalRecords : number =0;
  currentCategoryId : number = 1;
  searchMode : boolean =false;

  constructor(private productService:ProductService , private _activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(()=>{
      this.listProduct();
    })
   
  }
   listProduct(){
   const  hasCategoryId : boolean = this._activatedRoute.snapshot.paramMap.has('id');
    if(hasCategoryId){
      // search by category id
     this.handleByCategoryId();
    }else{
      // go to list all products
      this.handleListProduct();
    }
  }

  handleListProduct(){
    this.productService.getProducts().subscribe(
      data => this.products = data
      )
  }

  handleByCategoryId(){
    const  hasCategoryId : boolean = this._activatedRoute.snapshot.paramMap.has('id');
    if(hasCategoryId){
     
        this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    }else{
      this.currentCategoryId = 1;
    }

    //i will setting the current page and the size

    //call the methode from product service 
    this.productService.getProductById(this.currentCategoryId ,0,10 ).subscribe(
      this.extractData()
    )
    
  }
   
  extractData(){
    return data => {
      this.products = data.content;
    }
  }

}
