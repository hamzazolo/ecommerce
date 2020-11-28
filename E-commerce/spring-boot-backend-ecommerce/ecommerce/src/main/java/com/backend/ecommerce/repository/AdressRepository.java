package com.backend.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.ecommerce.models.Address;

@Repository
public interface AdressRepository extends JpaRepository<Address, Long>{

}
