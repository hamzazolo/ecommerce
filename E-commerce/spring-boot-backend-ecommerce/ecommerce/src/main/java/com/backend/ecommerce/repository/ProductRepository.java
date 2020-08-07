package com.backend.ecommerce.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.ecommerce.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

	Page<Product> findByCategoryId(Long id, Pageable pageable);
	
	Page<Product> findAll(Pageable pageable);
}
