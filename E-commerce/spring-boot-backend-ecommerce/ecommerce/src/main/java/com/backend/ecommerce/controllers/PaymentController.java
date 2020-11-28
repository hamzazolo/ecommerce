package com.backend.ecommerce.controllers;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.ecommerce.models.Sales;
import com.backend.ecommerce.payload.response.MessageResponse;
import com.backend.ecommerce.repository.SalesRepository;
import com.backend.ecommerce.services.StripeClient;
import com.stripe.model.Charge;

import lombok.extern.slf4j.Slf4j;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/payment")
@Slf4j
public class PaymentController {

	@Autowired
	private SalesRepository salesRepository;
	private StripeClient stripeClient;

    @Autowired
    PaymentController(StripeClient stripeClient) {
        this.stripeClient = stripeClient;
    }

    @PostMapping("/charge")
    public ResponseEntity<?> chargeCard(@Valid @RequestBody Sales sale) throws Exception {
    	log.info("start payment");
     //   String token = request.getHeader("token");
        try {
        	Charge charge = this.stripeClient.chargeNewCard(sale.getToken(), sale.getAmount());
        	 if(charge.getPaid()) {
        		 log.info("sale message paid : "+charge.getOutcome().getSellerMessage());
        		 sale.setDateSale(new Date());
        		// sale.setToken(token);
        		// this.salesRepository.save(sale);
        		 return   ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(charge.getOutcome().getSellerMessage()));
        	 }else {
        		 log.error("sale message not paid: "+charge.getOutcome().getSellerMessage());
        		 return  ResponseEntity.badRequest().body(new MessageResponse(charge.getOutcome().getSellerMessage()));
        	 }
        		 
		} catch (Exception e) {
			log.error("error in charge API : "+e);
			return ResponseEntity.badRequest().body(e.getMessage());
		}
        
    }
}
