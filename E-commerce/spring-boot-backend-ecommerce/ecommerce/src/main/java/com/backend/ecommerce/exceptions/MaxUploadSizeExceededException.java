package com.backend.ecommerce.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class MaxUploadSizeExceededException extends Exception{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public MaxUploadSizeExceededException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	
}
