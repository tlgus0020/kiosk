	package com.my.kiosk.stock.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.my.kiosk.stock.classes.Stock;
import com.my.kiosk.stock.classes.StockDTO;
import com.my.kiosk.stock.classes.StockIn;
import com.my.kiosk.stock.classes.StockOut;
import com.my.kiosk.stock.service.StockService;

@CrossOrigin(origins = "*")
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
	
	@PostMapping("/consume")http://localhost:8080/stock
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
	 
	 	//menu_id로 
	 	@GetMapping("/menu/{menu_id}")
		public List<Stock> getStocksByMenuId(@PathVariable("menu_id") int menu_id) {
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
	    	
	    
	    @GetMapping("/getStockList")
	    public List<StockDTO> getStockList() {
	    	return stockservice.getStockList();
	    	
	    }
	    
	    // 재고 출고
	    @PostMapping("/stock/out")
	    public ResponseEntity<?> stockOut(@RequestParam("menu_id") String menu_id, @RequestParam("place_id") String place_id, @RequestParam("amount") String amount) {
	        stockservice.processStockOut(Integer.parseInt(menu_id),  Integer.parseInt(place_id),Integer.parseInt(amount) );
	        return ResponseEntity.ok().body("good");
	    }
	    
	    
	    
}
