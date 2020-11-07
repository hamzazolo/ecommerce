package com.backend.ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.ecommerce.exceptions.ResourceNotFoundException;
import com.backend.ecommerce.models.Category;
import com.backend.ecommerce.repository.CategoryRepository;
import com.backend.ecommerce.services.CategoryService;

@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = "*", maxAge = 3600)
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@GetMapping("/categories")
	public ResponseEntity<?> categoreis() {
		List<Category> categories = this.categoryService.allCategory();
		return ResponseEntity.ok(categories);
	}

	@GetMapping("/categories/{id}")
	public ResponseEntity<?> categoryById(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
		Category cat = this.categoryService.find(id)
				.orElseThrow(() -> new ResourceNotFoundException("No category with this id :: " + id));
		return ResponseEntity.ok(cat);
	}

	@PostMapping("/saveCategory")
	public ResponseEntity<?> save(@RequestBody Category category) {
		Category cat = this.categoryService.save(category);
		return ResponseEntity.ok(cat);
	}

	@PutMapping("/updateCategory")
	public ResponseEntity<?> update(@RequestBody Category category) throws ResourceNotFoundException {
		this.categoryService.findById(category)
				.orElseThrow(() -> new ResourceNotFoundException("No category with this id :: " + category.getId()));
		Category cat = this.categoryService.save(category);
		return ResponseEntity.ok(cat);
	}

	@DeleteMapping("/deleteCategory/{id}")
	public ResponseEntity<?> delete(@PathVariable(value = "id") Long id) throws ResourceNotFoundException {
		Category cat = this.categoryService.find(id)
				.orElseThrow(() -> new ResourceNotFoundException("No category with this id :: " + id));
		if (!cat.getProducts().isEmpty()) {
			return new ResponseEntity<>("You can not remove this category", HttpStatus.BAD_REQUEST);
		}
		this.categoryService.deleteCategory(id);
		return ResponseEntity.ok(this.categoryService.allCategory());
	}
}
