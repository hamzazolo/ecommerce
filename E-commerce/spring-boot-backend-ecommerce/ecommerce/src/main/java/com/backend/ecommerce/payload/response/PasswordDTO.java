package com.backend.ecommerce.payload.response;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @Data
public class PasswordDTO {

	private Long userId;
	private String newPassword;
	private String oldPassword;
}
