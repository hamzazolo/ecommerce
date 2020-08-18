package com.backend.ecommerce.payload.request;

import java.util.Set;

import javax.validation.constraints.*;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SignupRequest {

	@NotBlank
	private String nom;
	@NotBlank
	private String prenom;
	@NotBlank
	@Size(min=3, max=20)
	private String username;
	@NotBlank
	@Size(min=3 ,max=20 )
	private String password;
	@NotBlank
	@Size(max=50)
	@Email
	private String email;
	private Set<String> role;
}
