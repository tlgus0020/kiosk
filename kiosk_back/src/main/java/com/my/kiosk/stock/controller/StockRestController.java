	package com.my.kiosk.stock.controller;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.my.kiosk.stock.classes.MerchDTO;
import com.my.kiosk.stock.classes.Stock;
import com.my.kiosk.stock.classes.StockDTO;
import com.my.kiosk.stock.classes.StockIn;
import com.my.kiosk.stock.classes.StockOut;
import com.my.kiosk.stock.classes.User;
import com.my.kiosk.stock.classes.placeDTO;
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
	 	@GetMapping("/stock")
		public List<Stock> stock(@RequestParam("place_id") int place_id) {
			return stockservice.getStock(place_id);
	 	}
	 	@GetMapping("/menu/{menu_id}")
		public List<Stock> getStocksByMenuId(@PathVariable("menu_id") int menu_id) {
			return stockservice.getStock(menu_id);
		}
	 	
	 	
	 	@GetMapping("/stocks")
	    public List<Stock> getAllStock() {
	 		System.out.println(stockservice.getAllStock());
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
	    @GetMapping("/getPlaceList")
	    public List<placeDTO> getPlaceList(){
	    	return stockservice.getPlaceList();
	    }
	    
	    @GetMapping("/getMerchList")
	    public List<MerchDTO> getMerchLIst(){
	    	return stockservice.getMerchList();
	    }
	    // 재고 출고
	    @PostMapping("/stock/out")
	    public ResponseEntity<?> stockOut(@RequestParam("menu_id") String menu_id, @RequestParam("place_id") String place_id, @RequestParam("amount") String amount) {
	        stockservice.processStockOut(Integer.parseInt(menu_id),  Integer.parseInt(place_id),Integer.parseInt(amount) );
	        return ResponseEntity.ok().body("good");
	    }
	    
	    @PostMapping("/retire")
	    public ResponseEntity<?> RetireProduct(@RequestParam("menu_id") String menu_id){
	    	
	    	stockservice.doRetire(menu_id);
	    	
	    	return ResponseEntity.ok("z");
	    }
	    
	    @PostMapping("/retireproduct")
	    public ResponseEntity<?> RetireProduct(@RequestParam("menu_id") String menu_id,@RequestParam("place_id") String place_id){
	    	
	    	stockservice.doRetire(menu_id,place_id);
	    	
	    	return ResponseEntity.ok("z");
	    }
	    
	    @PostMapping("/login")
	    public ResponseEntity<?> login(@RequestParam("userid") String userid, @RequestParam("userpwd") String userpwd){
	    	User user=stockservice.login(userid,userpwd);
	    	
	    	if (user == null) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디/비번이 잘못되었습니다");
	        }

	        return ResponseEntity.ok("로그인 성공! 관리자 ID: " + user.getUserid());
	    }
}
