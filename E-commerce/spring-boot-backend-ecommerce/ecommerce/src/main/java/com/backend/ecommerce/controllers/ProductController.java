package com.backend.ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.ecommerce.models.Product;
import com.backend.ecommerce.payload.response.ProductResponse;
import com.backend.ecommerce.repository.ProductRepository;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/product")

public class ProductController {

	@Autowired
	private ProductRepository prodcutRep;

	@GetMapping("/products")
	public ResponseEntity<?> products(@Param("id") Long id, @Param("page") int page, @Param("size") int size) {
		System.out.println("WS products ");
		System.out.println("WS id : " + id + " page : " + page + " size : " + size);
		PageRequest pageRequest = PageRequest.of(page, size);
		System.out.println("pageable : " + pageRequest);
		Page<Product> p = this.prodcutRep.findByCategoryId(id, pageRequest);

		return ResponseEntity.ok(p);
	}

	@GetMapping("/allProducts")
	public ResponseEntity<?> allProduct(@Param("page") int page, @Param("size") int size) {
		// List<Product> products = this.prodcutRep.findAll();
		System.out.println("WS id all products : page : " + page + " size : " + size);
		PageRequest pageRequest = PageRequest.of(page, size);
		try {
			Page<Product> products = this.prodcutRep.findAll(pageRequest);
			System.out.println("products size " + products.getSize());
			return ResponseEntity.ok(products);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}

	@GetMapping("/getProduct")
	public ResponseEntity<?> getProduct(@Param("id") Long id) {
		Product p = this.prodcutRep.findById(id).get();
		// ProductResponse productResponse = new ProductResponse(p.getId(),
		// p.getDescription(), p.getImageURL(), p.getName());
		return ResponseEntity.ok(p);
	}

}
