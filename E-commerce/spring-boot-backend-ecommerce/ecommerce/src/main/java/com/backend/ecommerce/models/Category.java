package com.backend.ecommerce.models;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter @AllArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String nameCategory;
	@OneToMany(cascade=CascadeType.ALL , mappedBy="category")
	@JsonIgnore
	private Set<Product> products;
	
	public Category() {
		super();
	}

	public Category(Long id, String nameCategory) {
		super();
		this.id = id;
		this.nameCategory = nameCategory;
	}
	
	
}
