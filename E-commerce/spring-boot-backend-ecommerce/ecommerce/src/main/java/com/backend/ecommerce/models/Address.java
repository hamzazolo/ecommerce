package com.backend.ecommerce.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
@Entity
@Data @NoArgsConstructor @ToString
public class Address {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@NotNull
	private String address1;
	private String address2;
	@NotNull
	private String country;
	private String state;
	private String city;
	private String zipeCode;
	@OneToOne(mappedBy="address")
	private Sales sale;
	
	public Address(String address1, String address2, String country, String state, String city, String zipeCode) {
		super();
		this.address1 = address1;
		this.address2 = address2;
		this.country = country;
		this.state = state;
		this.city = city;
		this.zipeCode = zipeCode;
	}
	
	
}
