package com.backend.ecommerce.models;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity @Getter @Setter @AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
    @NotNull
	private String name;
	private String description;
	private Date dateCreated;
	private Date dateUpdated;
	private BigDecimal price;
	private int unitStock;
	private String imageURL;
	private String imageURL2;
	@ManyToOne 
	@JoinColumn(name="category_id" , nullable=false)
	private Category category;
	
	public Product() {
		super();
	}

	public Product(@NotNull String name, String description, Date dateCreated, BigDecimal price,
			int unitStock, String imageURL, Category category) {
		super();
		this.name = name;
		this.description = description;
		this.dateCreated = dateCreated;
		this.price = price;
		this.unitStock = unitStock;
		this.imageURL = imageURL;
		this.category = category;
	}
	
	
	
}
