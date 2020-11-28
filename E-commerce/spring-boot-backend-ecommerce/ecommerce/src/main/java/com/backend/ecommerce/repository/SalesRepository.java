package com.backend.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.ecommerce.models.Sales;

@Repository
public interface SalesRepository extends JpaRepository<Sales, Long>{

}
