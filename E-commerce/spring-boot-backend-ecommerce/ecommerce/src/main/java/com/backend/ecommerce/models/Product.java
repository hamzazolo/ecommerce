package com.backend.ecommerce.models;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity @Getter @Setter @AllArgsConstructor @ToString
public class Product {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
    @NotNull
	private String name;
    @Column(columnDefinition="TEXT")
	private String description;
	private Date dateCreated;
	private Date dateUpdated;
	private BigDecimal price;
	private int unitStock;
	private String imageURL;
	private String imageURL2;
//	@Column(name = "picByte", length = 10000)
//	private byte[] picByte;
//	
//	@Column(name = "secend_picByte",columnDefinition = "LONGBLOB")
//	private byte[] SecendPicByte;
	@ManyToOne (fetch=FetchType.EAGER)
	@JoinColumn(name="category_id" , nullable=false)
	private Category category;
	
	private String imageKey;
	private String secendImageKey;
	
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

//	public Product(@NotNull String name, String description, Date dateCreated,  BigDecimal price,
//			int unitStock, String imageURL, String imageURL2, byte[] picByte , byte[] SecendPicByte) {
//		super();
//		this.name = name;
//		this.description = description;
//		this.dateCreated = dateCreated;
//		this.price = price;
//		this.unitStock = unitStock;
//		this.imageURL = imageURL;
//		this.imageURL2 = imageURL2;
//		this.picByte = picByte;
//		this.SecendPicByte = SecendPicByte;
//	}
	
	public Product(@NotNull String name, String description, Date dateCreated,  BigDecimal price,
			int unitStock, String imageURL, String imageURL2, String key , String secendKey) {
		super();
		this.name = name;
		this.description = description;
		this.dateCreated = dateCreated;
		this.price = price;
		this.unitStock = unitStock;
		this.imageURL = imageURL;
		this.imageURL2 = imageURL2;
		this.imageKey =  key;
		this.secendImageKey = secendKey;
	}

	public Product(@NotNull String name, String description, Date dateUpdated, BigDecimal price, int unitStock,
			String imageURL, String imageURL2, Category category, String imageKey, String secendImageKey) {
		super();
		this.name = name;
		this.description = description;
		this.dateUpdated = dateUpdated;
		this.price = price;
		this.unitStock = unitStock;
		this.imageURL = imageURL;
		this.imageURL2 = imageURL2;
		this.category = category;
		this.imageKey = imageKey;
		this.secendImageKey = secendImageKey;
	}
	
	
	
	
}
