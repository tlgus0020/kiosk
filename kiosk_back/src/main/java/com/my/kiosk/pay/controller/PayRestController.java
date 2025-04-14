package com.my.kiosk.pay.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.my.kiosk.pay.classes.PayMentDTO;
import com.my.kiosk.pay.service.PayService;
import com.my.kiosk.stock.classes.Stock;

@RestController
@RequestMapping("/api/pay")
public class PayRestController {

	@Autowired
	PayService payService;
	
	@GetMapping("/list")
	public ResponseEntity<?> getPayList(){		
		return ResponseEntity.ok().body(payService.getPayList());
	}
	
	@GetMapping("/detail/{id}")
	public ResponseEntity<?> getPayDetailById(@PathVariable("id") int id) {
		return ResponseEntity.ok().body(payService.getPayDetailById(id));
	}
	
	@GetMapping("/details/{pay_num}")
	public ResponseEntity<?> getPayDetailByPayNum(@PathVariable("pay_num") Long pay_num){
		
		return ResponseEntity.ok().body(payService.getPayDetailByPayNum(pay_num));
	}

	@GetMapping("/datefilter")
	public ResponseEntity<?> getdateFilter(@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){
		System.out.println(startDate);
		System.out.println(endDate);
			startDate = startDate + " 00:00:00";
			endDate = endDate + " 23:59:59";
			LocalDateTime start = LocalDateTime.parse(startDate, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
			LocalDateTime end = LocalDateTime.parse(endDate, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
			System.out.println("startDate:"+start);
			System.out.println("endDate:"+end);

		return ResponseEntity.ok().body(payService.getdateFilter(start,end));
    	
	}
	
	//결제완료 시 데이터 저장 테스트
	@PostMapping("/payment")
	public ResponseEntity<?> insertPayData(@RequestBody PayMentDTO PayData){
		if(payService.insertPayData(PayData) == 1) {
			return ResponseEntity.ok().body("성공");
		}
		return ResponseEntity.badRequest().body("실패");
	}
	
	@GetMapping("/page/{page}")
	public ResponseEntity<?> getPayPage(@PathVariable("page") int page){
		
		return ResponseEntity.ok().body(payService.getPayPage(page));
	}
	
}
