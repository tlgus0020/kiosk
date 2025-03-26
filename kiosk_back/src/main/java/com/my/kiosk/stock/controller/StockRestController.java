	package com.my.kiosk.stock.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.my.kiosk.stock.classes.Stock;
import com.my.kiosk.stock.service.StockService;

@RestController
@RequestMapping("/api/stock")
public class StockRestController {
	
	@Autowired
	StockService stock_ser;
	
	@GetMapping("/")
	public ResponseEntity<?> stockList(@RequestParam("place_id") int placeId) {
		List<Stock> stocklist = stock_ser.getStockByPlace(placeId);
		return ResponseEntity.ok(stocklist);
	}
	
	@PostMapping("/consume")
	public ResponseEntity<?> consumeStock(){
		return null;
	}
	
	@PostMapping("/in")
	public ResponseEntity<?> stockIn(){ 
		return null;
	}
	
	@PostMapping("/out")
	public ResponseEntity<?> stockOut(){
		return null;
	}
}
