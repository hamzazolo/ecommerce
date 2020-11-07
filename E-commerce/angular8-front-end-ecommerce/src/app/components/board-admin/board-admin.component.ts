import { Component, OnInit, ɵConsole } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/models/product';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { CategoryServiceService } from 'src/app/_services/category-service.service';
import { Category } from 'src/app/models/category';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {

  products: Product[];
  page = 1;
  pageSize = 5;
  totalRecords = 0;
  filter = new FormControl('');
  productForm: FormGroup;
  isLoading = false;
  addProduct = false;
  desc = "";
  product: Product = new Product();
  categoreis: Category[];
  category: Category;
  selectedFile : File;
  selectedSecendFile : File;
  imageName="Choose file...";
  secendImageName = "Choose file...";

  constructor(private userService: UserService, private productService: ProductService, private fb: FormBuilder,
              private categorySevice: CategoryServiceService, private toaster : ToastrService, private router:Router) {

  }

  ngOnInit() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
//      imageURL1: ['', Validators.required],
//      imageURL2: ['', Validators.required],
      description: ['', Validators.required],
      categorySelect: ['', Validators.required],
      imageFile:['',Validators.required],
      imageFile2:['',Validators.required]
    })
    this.listProduct();
    this.getAllCategoris();
  }

  getAllCategoris() {
    this.categorySevice.getCategories().subscribe(
      data => this.categoreis = data
    )
  }
  listProduct() {
    this.productService.getProducts(this.page - 1, this.pageSize).subscribe(
      this.extractData()
    )
  }

  extractData() {
    return data => {
      this.products = data.content;
      this.totalRecords = data.totalElements;
    }
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
  onSubmit() {
    this.isLoading = true;
    this.product.name = this.productForm.get('productName').value;
    this.product.price = this.productForm.get('price').value;
//    this.product.imageURL = this.productForm.get('imageURL1').value;
//   this.product.imageURL2 = this.productForm.get('imageURL2').value;
    this.product.description = this.productForm.get('description').value;
    this.product.unitStock = this.productForm.get('price').value;
    this.product.category = this.category;
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile',this.selectedFile);
    uploadImageData.append('secendImageFile',this.selectedSecendFile);
    Object.keys(this.product).forEach((key) => {uploadImageData.append(key, this.product[key]); });
    Object.keys(this.product.category).forEach((key) => {uploadImageData.append(key, this.product.category[key]); });
    this.productService.addProduct(uploadImageData).subscribe(
      response => {
      
          this.isLoading =false;
          this.addProduct = false;
          this.page =1; 
          this.pageSize=5;
          this.toaster.success("The product "+this.product.name+" added with successfully")
          this.router.navigateByUrl("/admin")
       
          
      },
      err => {
        this.isLoading =false;
        this.toaster.error(err.error.message)
      }
    )
  }
  selectChangeHandler(category_id: number) {
    this.categorySevice.getCategoryById(category_id).subscribe(
      data => {
        this.category = data;
        console.log('cat : ', this.category)
      },
      err => { 
        console.log("error : ", err.error) 
      }
    )
  }
  showForm() {
    this.addProduct = true;

  }

  cancel() {
    this.productForm.reset();
    this.addProduct = false;
    this.isLoading = false;
  }
  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    // tslint:disable-next-line:no-console
   // console.log('editor-change', event);
    this.desc = event['editor']['root']['innerHTML'];
  }
  deleteProduct(id:number){
    this.productService.deleteProduct(id).subscribe(
      data => {
        console.log("data in delete => "+data)
        this.toaster.success("Product deleted");
        this.listProduct();
       // window.location.reload();
      },err=>{
         this.toaster.error(err.error);
      }
    )
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
