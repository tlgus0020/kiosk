package com.my.kiosk.order.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.my.kiosk.order.classes.OrderRequestDTO;
import com.my.kiosk.order.service.StockOrderService;

@RestController
@RequestMapping("/api/order")
public class StockOrderController {
	
	@Autowired
	StockOrderService orderservice;
	
	
	@PostMapping("request")
	public ResponseEntity<?> requestorder(@RequestBody OrderRequestDTO dto){
		 System.out.println("받은 발주 요청: " + dto);
		orderservice.insertOrder(dto);
		return ResponseEntity.ok().body("good");
	}
}
