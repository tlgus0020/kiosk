package com.my.kiosk.pay.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.my.kiosk.pay.service.PayService;

@RestController
@RequestMapping("/api/pay")
public class PayRestController {

	@Autowired
	PayService payService;
	
	@GetMapping("/list")
	public ResponseEntity<?> getPayList(){
		
		return ResponseEntity.ok().body(payService.getPayList());
	}
}
