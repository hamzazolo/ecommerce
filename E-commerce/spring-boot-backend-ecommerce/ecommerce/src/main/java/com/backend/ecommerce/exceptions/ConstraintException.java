package com.backend.ecommerce.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class ConstraintException extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = 439327904173304029L;

	public ConstraintException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	
}
