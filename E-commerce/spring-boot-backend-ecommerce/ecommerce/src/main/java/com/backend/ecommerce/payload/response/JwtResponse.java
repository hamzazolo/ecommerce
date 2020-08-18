package com.backend.ecommerce.payload.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter 
public class JwtResponse {

	private String token;
	private String type= "Bearer";
	private Long id;
	private String username;
	private String email;
	private List<String> roles;
	private String nom;
	private String prenom;
	
	public JwtResponse(String accessToken, Long id, String username, String email, List<String> roles, String nom, String prenom) {
		this.token = accessToken;
		this.id = id;
		this.username = username;
		this.email = email;
		this.roles = roles;
		this.nom=nom;
		this.prenom=prenom;
	}

	public JwtResponse(Long id, String email, List<String> roles, String nom, String prenom) {
		super();
		this.id = id;
		this.email = email;
		this.roles = roles;
		this.nom = nom;
		this.prenom = prenom;
	}
	
	
}
