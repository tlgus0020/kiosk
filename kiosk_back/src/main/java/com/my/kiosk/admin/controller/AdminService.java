package com.my.kiosk.admin.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.kiosk.stock.classes.Menu;
import com.my.kiosk.stock.classes.Stock;
import com.my.kiosk.stock.classes.StockDTO;
import com.my.kiosk.stock.repository.StockMapper;

@Service
public class AdminService {

	
	@Autowired
	StockMapper stockmapper;
	
	public void Method() {
		
	}
	
    public List<StockDTO> getStockList(){
    	List<Stock> stocks = stockmapper.findAll();
    	System.out.println(stocks);
    	List<StockDTO> result = new ArrayList<>();
    	for(Stock s : stocks) {
    		StockDTO r = new StockDTO();
    		 r.setPlace_name(stockmapper.getPlaceName(s.getPlace_id()));
    		 r.setFlavor_name(stockmapper.getMenuName(s.getMenu_id()));
    		 r.setAmount(s.getStock_qty());
    		 r.setInOrder(false); // 발주중
    		 
    		 if(stockmapper.isRetired(s.getMenu_id()) == null || stockmapper.isRetired(s.getMenu_id()) == 0){
    			 r.setSelling(false);
    		 }
    		 else {
        		 r.setSelling(s.isSelling());
    		 }
    		 r.setFlavor_id(s.getMenu_id());
    		 r.setPlace_id(s.getPlace_id());
    		 result.add(r);
    	}
    	return result;
    }

	public List<Menu> getMenuList() {
		return stockmapper.getAllMenu();
	}
}
