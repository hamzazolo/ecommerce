package com.backend.ecommerce.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.ecommerce.models.Category;
import com.backend.ecommerce.repository.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;
	
	
	public Category save(Category cat) {
		return this.categoryRepository.save(cat);
	}
	
	
	public List<Category> allCategory(){
		return this.categoryRepository.findAll();
	}
	
	public Optional<Category> findById(Category cat) {
		return this.categoryRepository.findById(cat.getId());	
	}
	
	public void deleteCategory(Long id) {
		this.categoryRepository.deleteById(id);
	}
	
	public Optional<Category> find(Long id) {
		return this.categoryRepository.findById(id);
	}
}
