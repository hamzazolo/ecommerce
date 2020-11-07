package com.backend.ecommerce.exceptions;

import java.util.List;

import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.Getter;

@Getter
public class InvalidImageExtensionException extends RuntimeException {

	List<String> validExtensions;
	
	 public InvalidImageExtensionException(List<String> validExtensions) {
	        this.validExtensions = validExtensions;
	    }

	
}
