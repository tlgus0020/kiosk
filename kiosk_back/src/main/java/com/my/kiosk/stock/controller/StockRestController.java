	package com.my.kiosk.stock.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.my.kiosk.stock.classes.Stock;
import com.my.kiosk.stock.classes.StockIn;
import com.my.kiosk.stock.classes.StockOut;
import com.my.kiosk.stock.service.StockService;

@RestController
//@RequestMapping("/api/stock")
@RequestMapping("/api")
public class StockRestController {
	
	/*
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
	*/
	
	 @Autowired
	    private StockService stockservice;
	 
	 @GetMapping("/stock")
		public Stock stock(@RequestParam("menu_id") int menu_id) {
			return stockservice.getStock(menu_id);
		}
	 @GetMapping("/stocks")
	    public List<Stock> getAllStock() {
	        return stockservice.getAllStock();  // 전체 멤버 목록 반환
	    }
	    @PostMapping("/stock/in")
	    public void stockIn(@RequestBody StockIn stockIn) {
	        stockservice.processStockIn(stockIn);
	    }

	    // 재고 출고
	    @PostMapping("/stock/out")
	    public void stockOut(@RequestBody StockOut stockOut) {
	        stockservice.processStockOut(stockOut);
	    }
}
