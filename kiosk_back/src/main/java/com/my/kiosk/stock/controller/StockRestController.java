package com.my.kiosk.stock.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.my.kiosk.stock.service.StockService;

@RestController
@RequestMapping("/api")
public class StockRestController {
	
	@Autowired
	StockService stock_ser;
	
	@GetMapping("test")
	public String test() {
		stock_ser.test();
		
		return "테스트입니다";
	}
	
}
