package com.my.kiosk.stock.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.kiosk.stock.classes.Stock;
import com.my.kiosk.stock.repository.StockMapper;

@Service
public class StockService {

	@Autowired
	StockMapper stockmapper;
	
	public List<Stock> getStockByPlace(int placeId) {
		return stockmapper.selectStockByPlace(placeId);
	}
	
}
