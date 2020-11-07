import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/models/product';
import { CategoryServiceService } from 'src/app/_services/category-service.service';
import { Category } from 'src/app/models/category';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  private productForm : FormGroup;
  private id:number;
  private product : Product;
  private categoreis : Category[];
  category: Category = new Category();
  private cate: Category = new Category();
  private isLoading = false;
  selectedFile : File;
  selectedSecendFile : File;
  imageName="Choose file...";
  secendImageName = "Choose file...";
 
  

  constructor(private fb : FormBuilder , private activatedRoute:ActivatedRoute, private productService: ProductService 
              , private categorySevice : CategoryServiceService , private toaster : ToastrService, private router:Router) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      
      description: ['', Validators.required],
      categorySelect: ['', Validators.required],
      imageFile:['',Validators.required],
      imageFile2:['',Validators.required]
    });
    this.id=+this.activatedRoute.snapshot.paramMap.get("id");
    this.getProductById(this.id);
    this.getAllCategoris();
  }
  
  getProductById(id:number){
    
    this.product = new Product();
    this.productService.getProduct(id).subscribe(
      data => {
        console.log("data => "+data)
        this.product = data;
         this.productForm.get('productName').setValue(this.product.name);
         this.productForm.get('price').setValue(this.product.price);
         this.productForm.get('stock').setValue(this.product.unitStock);
        
         this.productForm.get('description').setValue(this.product.description);
         this.category = data.category;
         console.log(data)
         console.log("cat => ",data.category)
         
      },
      err => {
        this.toaster.error(err.error)
      }
    )

  }

  getAllCategoris() {
    this.categorySevice.getCategories().subscribe(
      data => this.categoreis = data
    )
  }

  selectChangeHandler(category_id: number) {
    console.log("select change category : ", category_id)
    this.categorySevice.getCategoryById(category_id).subscribe(
      data => {
        this.category = data;
        console.log('cat : ', this.category)
      },
      err => { console.log("error : ", err.error) }
    )
  }
  onSubmit(){
    this.isLoading = true;
    this.product.id = this.id;    
    this.product.name = this.productForm.get('productName').value;
    this.product.price = this.productForm.get('price').value;
    this.product.description = this.productForm.get('description').value;
    this.product.unitStock = this.productForm.get('stock').value;
    this.product.category = this.category;
    const uploadImageData = new FormData();
    uploadImageData.append('idCategory', this.category.id+"");
    uploadImageData.append('imageFile',this.selectedFile);
    uploadImageData.append('imageFile2',this.selectedSecendFile);
    
    Object.keys(this.product).forEach((key) => {uploadImageData.append(key, this.product[key]); });
    Object.keys(this.product.category).forEach((key) => {uploadImageData.append(key, this.product.category[key]); });
    this.productService.updateProduct(uploadImageData).subscribe(
      data => {
         this.router.navigateByUrl("/admin")
         this.toaster.success("Your product updated with success")
         this.isLoading = false;
      }, err =>{
         this.toaster.error(err.error)
         this.isLoading = false;
      }
    )
    
  }
  cancel() {
    this.productForm.reset();
    this.isLoading = false;
    this.router.navigateByUrl("/admin")
  }
  //Gets called when the user selects an image
  onFileChanged(event){
    this.selectedFile= event.target.files[0];
    this.imageName=this.selectedFile.name;
    console.log("image : "+this.selectedFile.name)
  }
  onFileChangedSecendImage(event){
    this.selectedSecendFile = event.target.files[0];
    this.secendImageName = this.selectedSecendFile.name;
  }
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],                                         // remove formatting button

      ['link']                         // link and image, video
    ]
  };

  
}
