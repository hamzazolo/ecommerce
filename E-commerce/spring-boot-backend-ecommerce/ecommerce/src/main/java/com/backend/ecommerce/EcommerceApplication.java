package com.backend.ecommerce;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.backend.ecommerce.models.Category;
import com.backend.ecommerce.models.Product;
import com.backend.ecommerce.repository.CategoryRepository;
import com.backend.ecommerce.repository.ProductRepository;

@SpringBootApplication
public class EcommerceApplication  {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceApplication.class, args);
	}
    
	

}
