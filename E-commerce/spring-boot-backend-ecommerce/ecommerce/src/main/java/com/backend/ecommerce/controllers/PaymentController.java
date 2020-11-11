package com.backend.ecommerce.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.ecommerce.services.StripeClient;
import com.stripe.model.Charge;

@RestController
@RequestMapping("/payment")
public class PaymentController {

	
	private StripeClient stripeClient;

    @Autowired
    PaymentController(StripeClient stripeClient) {
        this.stripeClient = stripeClient;
    }

    @PostMapping("/charge")
    public Charge chargeCard(HttpServletRequest request) throws Exception {
    	System.out.println("charge card èèèèèè");
        String token = request.getHeader("token");
        Double amount = Double.parseDouble(request.getHeader("amount"));
        System.out.println("token "+token);
        System.out.println("amount "+amount);
        return this.stripeClient.chargeNewCard(token, amount);
    }
}
