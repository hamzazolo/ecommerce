package com.backend.ecommerce.models;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="users" , uniqueConstraints = {
		@UniqueConstraint(columnNames="username"),
		@UniqueConstraint(columnNames="email")
})
@Getter @Setter @Data @AllArgsConstructor
public class User {

	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@NotBlank
	private String nom;
	@NotBlank
	private String prenom;
	@NotBlank
	@Size(max = 20)
	private String username;
	@NotBlank
	@Size(max = 120)
	private String password;
	@NotBlank 
	@Size(max = 50)
	private String email;
	private boolean blocked = false;
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(name="users_roles", 
	           joinColumns=@JoinColumn(name="user_id"),
	           inverseJoinColumns=@JoinColumn(name="role_id"))
	private Set<Role> roles = new HashSet<>();
	
	public User(String nom,String prenom,String username,  String password,String email) {
		this.nom=nom;
		this.prenom=prenom;
		this.username = username;
		this.password = password;
		this.email = email;
	}

	public User() {
		super();
	}
	
	
}
