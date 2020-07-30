package com.backend.ecommerce.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProductResponse {

	private Long id;
	private String description;
	private String imgaeURL;
	private String name;
	private int quantite;
	
	
	public ProductResponse(Long id, String description, String imgaeURL, String name, int quantite) {
		super();
		this.id = id;
		this.description = description;
		this.imgaeURL = imgaeURL;
		this.name = name;
		this.quantite = quantite;
	}

  
	public ProductResponse() {
		super();
	}


	public ProductResponse(Long id, String description, String imgaeURL, String name) {
		super();
		this.id = id;
		this.description = description;
		this.imgaeURL = imgaeURL;
		this.name = name;
	}
	
	
}
