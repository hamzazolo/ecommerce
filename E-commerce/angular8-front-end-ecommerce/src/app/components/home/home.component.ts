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
  page= 1;
  pageSize : number = 5;
  totalRecords : number =0;
  currentCategoryId : number = 1;
  previousCategory : number =1;
  searchMode : boolean =false;

  

  constructor(private productService:ProductService , private _activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(()=>{
      this.listProduct();
    })
   
  }

  test(page){
    
    console.log("===>",page)
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
    console.log("page : ",this.currentPage ," and pageSize : "+this.pageSize)
    this.productService.getProducts(this.currentPage -1 ,this.pageSize).subscribe(
      this.extractData()
      )
  }

  handleByCategoryId(){
    console.log("handleByCategoryId")
    const  hasCategoryId : boolean = this._activatedRoute.snapshot.paramMap.has('id');
    if(hasCategoryId){
     
        this.currentCategoryId = +this._activatedRoute.snapshot.paramMap.get('id');
    }else{
      this.currentCategoryId = 1;
    }

    //i will setting the current page and the size
    if(this.previousCategory != this.currentCategoryId){
      console.log("previouse category : ",this.previousCategory)
      console.log("current category : ",this.currentCategoryId)
      this.currentPage =1;
    }
    this.previousCategory = this.currentCategoryId;
    //call the methode from product service 
    this.productService.getProductById(this.currentCategoryId ,this.currentPage -1 ,this.pageSize ).subscribe(
      this.extractData()
    )
    
  }
  updatePageSize(pageSize:number){
  console.log("i'm in update page size");
  this.pageSize = pageSize;
  this.currentCategoryId =1;
  this.listProduct();
  }
  extractData(){
    return data => {
      this.products = data.content;
      this.totalRecords = data.totalElements ;
      this.pageSize= data.size;
      this.currentPage = data.number + 1;
      console.log("total elements",data.totalElements)
      console.log("currentPage  "+this.currentPage)
      
    }
  }

}
