package com.backend.ecommerce.exceptions;

import java.util.ArrayList;
import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

	 @ExceptionHandler(ResourceNotFoundException.class)
	    public ResponseEntity<?> resourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
	         ErrorDetails errorDetails = new ErrorDetails(new Date(), ex.getMessage(), request.getDescription(false));
	         return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	    }

	    @ExceptionHandler(Exception.class)
	    public ResponseEntity<?> globleExcpetionHandler(Exception ex, WebRequest request) {
	        ErrorDetails errorDetails = new ErrorDetails(new Date(), ex.getMessage(), request.getDescription(false));
	        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	    
	    @ExceptionHandler(ConstraintException.class)
	    public ResponseEntity<?> handle(ConstraintException ex , WebRequest request) {
	          ErrorDetails errorDetails = new ErrorDetails(new Date(),ex.getMessage().intern(), request.getDescription(false));    
	         return new ResponseEntity<>(errorDetails, null, HttpStatus.BAD_REQUEST);
	    }
	    
	    @ExceptionHandler(MaxUploadSizeExceededException.class)
	    public ResponseEntity<?> uploadSizeExceeded(MaxUploadSizeExceededException ex, WebRequest request) {
	         ErrorDetails errorDetails = new ErrorDetails(new Date(), ex.getMessage(), request.getDescription(false));
	         return new ResponseEntity<>(errorDetails, HttpStatus.BANDWIDTH_LIMIT_EXCEEDED);
	    }
}
