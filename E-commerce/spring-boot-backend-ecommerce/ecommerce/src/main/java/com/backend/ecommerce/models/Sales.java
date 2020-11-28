package com.backend.ecommerce.models;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
@Entity
@Data @NoArgsConstructor @ToString
public class Sales {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@NotNull
	private String email;
	@NotNull
	private String phone;
	@NotNull 
	private String cardNumber;
	@NotNull 
	private String firstName;
	@NotNull 
	private String lastName;
	@NotNull 
	private int expiryYear;
	@NotNull(message="expiry month my not be null") 
	private int expiryMonth;
	@NotNull 
	private int cvc; 
	private Date dateSale;
	private double amount;
	private String currency;
	private String token;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="address_id",referencedColumnName="id")
	private Address address;

	public Sales(@NotNull String email, @NotNull String phone, @NotNull @NotBlank String cardNumber,
			@NotNull @NotBlank String firstName, @NotNull @NotBlank String lastName, @NotNull @NotBlank int expiryMonth,
			@NotNull @NotBlank int expiryYear, @NotNull @NotBlank int cvc, Date dateSale, double amount,
			String currency, String token, Address address) {
		super();
		this.email = email;
		this.phone = phone;
		this.cardNumber = cardNumber;
		this.firstName = firstName;
		this.lastName = lastName;
		this.expiryMonth = expiryMonth;
		this.expiryYear = expiryYear;
		this.cvc = cvc;
		this.dateSale = dateSale;
		this.amount = amount;
		this.currency = currency;
		this.token = token;
		this.address = address;
	}
	
	
	
	
	
}
