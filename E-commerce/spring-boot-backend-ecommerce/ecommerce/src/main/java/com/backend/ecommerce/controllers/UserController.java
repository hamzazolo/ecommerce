package com.backend.ecommerce.controllers;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.ecommerce.exceptions.ConstraintException;
import com.backend.ecommerce.exceptions.ResourceNotFoundException;
import com.backend.ecommerce.models.User;
import com.backend.ecommerce.payload.request.UserRequest;
import com.backend.ecommerce.payload.response.JwtResponse;
import com.backend.ecommerce.repository.UserRepository;
import com.backend.ecommerce.services.UserDetailsServiceImpl;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	UserRepository userRepository;

	@PreAuthorize("hasRole('USER')")
	@PutMapping("/users")
	public ResponseEntity<?> updateInformations(@RequestBody UserRequest userDetails, @RequestHeader (name="Authorization") String token )
			throws ResourceNotFoundException, ConstraintException {
		System.out.println("i'm here user id " + userDetails.getId());
		User user = this.userRepository.findById(userDetails.getId()).orElseThrow(
				() -> new ResourceNotFoundException("User not found with this id :: " + userDetails.getId()));
		System.out.println("user after find  " + user.getId());
		
		for(User u :this.userRepository.findAll() ) {
			if(u.getEmail().equalsIgnoreCase(userDetails.getEmail()) && !u.getId().equals(userDetails.getId()))
				throw new ConstraintException("Email already token");
		}

		user.setEmail(userDetails.getEmail());
		user.setNom(userDetails.getNom());
		user.setPrenom(userDetails.getPrenom());
		final User userUpdate = this.userRepository.save(user);
		List<String> roles = userUpdate.getRoles().stream().map(item -> item.getName().toString())
				.collect(Collectors.toList());
		
		System.out.println("roles : "+roles+" ==> "+token);
		JwtResponse response = new JwtResponse(token,  userUpdate.getId(), userUpdate.getUsername(), userUpdate.getEmail(), roles, userUpdate.getNom(), userUpdate.getPrenom());
		return ResponseEntity.ok(response);
	}
}
