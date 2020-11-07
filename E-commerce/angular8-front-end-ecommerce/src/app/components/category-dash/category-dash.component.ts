import { Component, OnInit } from '@angular/core';
import { CategoryServiceService } from 'src/app/_services/category-service.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-dash',
  templateUrl: './category-dash.component.html',
  styleUrls: ['./category-dash.component.css']
})
export class CategoryDashComponent implements OnInit {

  categoreis: Category[];
  category: Category = new Category();
  updateCategory: boolean = false;
  inputError = false;
  isMsgError = false;
  msgError ='';

  constructor(private categoryService: CategoryServiceService) { }

  ngOnInit() {
    this.getAllCategoris();
  }

  getAllCategoris() {
    this.categoryService.getCategories().subscribe(
      data => this.categoreis = data
    )
  }

  updateCategoryStart(myCategory) {
    this.updateCategory = true;
    this.category = myCategory;
  }

  addCategory() {
    if (this.category.nameCategory == null || this.category.nameCategory == undefined) {
      this.inputError = true;
      return;
    }

    this.categoryService.saveCategory(this.category).subscribe(
      (category) => {
        this.categoreis = [category, ...this.categoreis];
        this.category = new Category();
        this.inputError = false;
      }
    )
  }

  updateCategoryEnd() {
    if (this.category.nameCategory == null || this.category.nameCategory == undefined || this.category.nameCategory.length == 0) {
      this.inputError = true;
      return;
    }
    this.categoryService.updateCategory(this.category).subscribe(
      category => {
        this.updateCategory = false;
        this.category = new Category();
        this.inputError = false;
      }
    )
  }

  deleteCategory(id) {
    this.categoryService.deleteCategory(id).subscribe(data => {
      this.categoreis = data;
    } , err => {
      this.isMsgError = true;
      this.msgError =err.error;
    }
    )
  }
  close(){
    this.isMsgError = false;
  }
}
