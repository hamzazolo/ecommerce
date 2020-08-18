package com.backend.ecommerce.payload.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @Data
public class UserRequest {

	private Long id;
	private String nom;
	private String prenom;
	private String email;
	
}
