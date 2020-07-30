package com.backend.ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.ecommerce.models.Category;
import com.backend.ecommerce.repository.CategoryRepository;

@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins="*" , maxAge=3600)
public class CategoryController {

	@Autowired
	private CategoryRepository categoryRepository;
	
	@GetMapping("/categories")
	public ResponseEntity<?> categoreis(){
		List<Category> categories = this.categoryRepository.findAll();
		return ResponseEntity.ok(categories);
	}
}
