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

	 	@Autowired
	    private StockService stockService;
	 
	 	//menu_id로 
	 	@GetMapping("/stock")
		public List<Stock> stock(@RequestParam("place_id") int place_id) {
			return stockService.getStock(place_id);
	 	}
	 	@GetMapping("/menu/{menu_id}")
		public List<Stock> getStocksByMenuId(@PathVariable("menu_id") int menu_id) {
			return stockService.getStock(menu_id);
		}
	 	
	 	@GetMapping("/stocks")
	    public List<Stock> getAllStock() {
	 		System.out.println(stockService.getAllStock());
	        return stockService.getAllStock();  // 전체 멤버 목록 반환
	    }
	 
	    @PostMapping("/stock/in")
	    public void stockIn(@RequestBody StockIn stockIn) {
	        stockService.processStockIn(stockIn);
	    }
	    	
	    
	    @GetMapping("/getStockList")
	    public List<StockDTO> getStockList() {
	    	return stockService.getStockList();
	    	
	    }
	    @GetMapping("/getPlaceList")
	    public List<placeDTO> getPlaceList(){
	    	return stockService.getPlaceList();
	    }
	    
	    @GetMapping("/getMerchList")
	    public List<MerchDTO> getMerchLIst(){
	    	return stockService.getMerchList();
	    }
	    // 재고 출고
	    @PostMapping("/stock/out")
	    public ResponseEntity<?> stockOut(@RequestParam("menu_id") String menu_id, @RequestParam("place_id") String place_id, @RequestParam("amount") String amount) {
	        stockService.processStockOut(Integer.parseInt(menu_id),  Integer.parseInt(place_id),Integer.parseInt(amount) );
	        return ResponseEntity.ok().body("good");
	    }
	    
	    @PostMapping("/retire")
	    public ResponseEntity<?> RetireProduct(@RequestParam("menu_id") String menu_id){
	    	
	    	stockService.doRetire(menu_id);
	    	
	    	return ResponseEntity.ok("z");
	    }
	    
	    @PostMapping("/retireproduct")
	    public ResponseEntity<?> RetireProduct(@RequestParam("menu_id") String menu_id,@RequestParam("place_id") String place_id){
	    	
	    	stockService.doRetire(menu_id,place_id);
	    	
	    	return ResponseEntity.ok("z");
	    }
	    
	    @PostMapping("/login")
	    public ResponseEntity<?> login(@RequestBody User userinfo) {
	        String userid = userinfo.getUserid();
	        String userpwd = userinfo.getUserpwd();
	        
	        System.out.println(userid);
	        System.out.println(userpwd);
	        
	        User user = stockService.login(userid, userpwd);
	        System.out.println(user);
	        
	        if (user == null) {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("아이디/비번이 잘못되었습니다");
	        }

	        return ResponseEntity.ok("로그인 성공! 관리자 ID: " + user.getUserid());
	    }

}
