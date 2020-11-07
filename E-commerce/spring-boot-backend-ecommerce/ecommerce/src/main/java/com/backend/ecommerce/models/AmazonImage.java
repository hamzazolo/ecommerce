package com.backend.ecommerce.models;


import java.util.List;

import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data @NoArgsConstructor @AllArgsConstructor
public class AmazonImage {


	@Id
	private String amazonUserImageId;

	@NotNull
	private String imageUrl;
	
	
	
	
}
