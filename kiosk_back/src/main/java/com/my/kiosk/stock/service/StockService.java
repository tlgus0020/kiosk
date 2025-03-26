package com.my.kiosk.stock.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.kiosk.stock.classes.Stock;
import com.my.kiosk.stock.repository.StockInJPA;
import com.my.kiosk.stock.repository.StockJPA;

@Service
public class StockService {
	
	@Autowired
	StockJPA jpa_stock;
	
	@Autowired
	StockInJPA jpa_stock_in;
	
	@Autowired
	StockInJPA jpa_stock_out;

	public void test() {
		Stock stock = new Stock();
		stock.setMenu_id(1);
		stock.setPlace_id(1);
		stock.setStock_qty(50);
		stock.setDate(java.sql.Date.valueOf(LocalDateTime.now().toLocalDate()));
		
		jpa_stock.save(stock);
	}
		
}
