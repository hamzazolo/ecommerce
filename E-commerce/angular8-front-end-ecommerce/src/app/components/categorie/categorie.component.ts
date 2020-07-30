import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryServiceService } from 'src/app/_services/category-service.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  categories:Category[] ;
  constructor(private categoryService:CategoryServiceService) { }

  ngOnInit() {
      console.log("test")
    this.categoryService.getCategories().subscribe(
      data => this.categories = data
    )
  }

}
