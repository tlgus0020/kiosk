package com.my.kiosk.admin.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.my.kiosk.stock.classes.Menu;
import com.my.kiosk.stock.classes.MenuDTO;
import com.my.kiosk.stock.classes.Stock;
import com.my.kiosk.stock.classes.StockDTO;
import com.my.kiosk.stock.classes.StockOut;
import com.my.kiosk.stock.classes.MenuOrder;
import com.my.kiosk.stock.repository.StockMapper;


@Service
public class AdminService {

	
	@Autowired
	StockMapper stockmapper;
	
	public void Method() {
		
	}
	
	
    
    /**발주state 처리할때..
    /발주state가 기존에 있다면 기존의 발주 state를 변경해야할 필요가 있음. 가장 최근에 동일한 조건의 출고 내역을 확인해서 내역이 있는지 확인.
    /있다 -> 재발주, 기존 StockOut의 id로 state를 select해서, 새로 만든 StockOut id로 update하고 state 0으로 바꿈.
    **/
    public void processStockOut(int menu, int place, int amount) {
    	
    	StockOut history = stockmapper.thereIsSameOrderBefore(menu,place);
    	StockOut news = new StockOut();
    	news.setMenu_id(menu);
    	news.setPlace_id(place);
    	news.setAmount(amount);
        stockmapper.insertStockOut(news); // 출고 데이터 저장
        StockOut newsnow =  stockmapper.thereIsSameOrderBefore(menu,place);
        if(history == null) {
        	System.out.println("처음 오더입니다.");
        	stockmapper.insertStockOrder(newsnow.getId());
        }
        else {
        	System.out.println("이전에 같은 발주 요청이 있었습니다.");
        	System.out.println(newsnow);
        	System.out.println(history);
        	stockmapper.updateStockOrder(newsnow.getId(),history.getId());
        }
    }

    
    
    public void setStockState(int outid, int state) {
    	stockmapper.updateStockOrderState(outid, state);
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
    		 
    		 StockOut out = stockmapper.thereIsSameOrderBefore(s.getPlace_id(), s.getMenu_id());
    		 if(out != null) {
    			 MenuOrder ord = stockmapper.getStockOrderState(out.getId());
    			 if(ord == null) {
    				 r.setInOrder(-1);
    			 }
    		 	else {
    		 		r.setInOrder(ord.getState()); // 발주중
    		 		r.setOut_id(out.getId());
    		 	}
    		 }
    		 else {
    			 r.setInOrder(-1);
    		 }
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

    /****************** 메뉴 기능 *********************/
	public List<Menu> getMenuList() {
		return stockmapper.getAllMenu();
	}


	public int addMenu(MenuDTO menudto) {
		Map<String,Object> response = new HashMap<>();
        
        if(menudto.getImg().isEmpty()) {
        	return 0;
        }
        
        String path = "C:\\Users\\admin\\Documents\\tlgus\\kiosk\\kiosk_back\\src\\main\\resources\\static\\img";
        File filePath = new File(path);
        
        if(!filePath.exists()) {
        	filePath.mkdir();
        	System.out.println("파일생성");
        }
        
        String originalName = menudto.getImg().getOriginalFilename();
        String filePullPath = path + File.separator + originalName;
        String fileLink = "http://localhost:8080/admin/img/" + originalName;
        
        try {
        	File destfile = new File(filePullPath);
        	menudto.getImg().transferTo(destfile);
        	
        	Menu menu = new Menu();
        	menu.setName(menudto.getName());
        	menu.setCode(menudto.getCode());
        	menu.setImg(fileLink);
        	menu.setState(false);
        	
        	return stockmapper.saveMenu(menu);
        	
        } catch (Exception e) {
			System.out.println(e.getMessage());
		}
        
		return 0;
	}
	/****************** 메뉴 기능 *********************/
}
