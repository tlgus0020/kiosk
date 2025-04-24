package com.my.kiosk.admin.controller;

import java.io.File;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.my.kiosk.admin.repository.AdminMapper;
import com.my.kiosk.stock.classes.Menu;
import com.my.kiosk.stock.classes.MenuDTO;
import com.my.kiosk.stock.classes.MenuOrder;
import com.my.kiosk.stock.classes.StockDTO;
import com.my.kiosk.stock.classes.StockFullDTO;
import com.my.kiosk.stock.classes.StockIn;
import com.my.kiosk.stock.classes.StockOut;
import com.my.kiosk.stock.repository.StockMapper;


@Service
public class AdminService {

	
	@Autowired
	StockMapper stockmapper;
	
	@Autowired
	AdminMapper adminmapper;
	
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

    
    
    @Transactional
    public void setStockState(int outid, int state) {
        if (state == 0) {
            StockOut out = stockmapper.getStockOutById(outid);
            MenuOrder order = stockmapper.getStockOrderState(outid);

            System.out.println("▶ getStockOrderState 결과: " + order);
            if (out != null && order != null) {
            	stockmapper.increaseStockQty(out.getMenu_id(), out.getPlace_id(), order.getAmount());

                StockIn stockIn = new StockIn();
                stockIn.setMenu_id(out.getMenu_id());
                stockIn.setPlace_id(out.getPlace_id());
                stockIn.setAmount(order.getAmount());
                stockIn.setDate(new Date(System.currentTimeMillis()));

                stockmapper.insertStockIn(stockIn);
            }
        }
        stockmapper.updateStockOrderState(outid, state);
    }
    
    
    public List<StockFullDTO> tester(){
    	return adminmapper.getFullStocks();
    }
    
    @Transactional
    public List<StockDTO> getStockList(){
    	List<StockFullDTO> stocks = adminmapper.getFullStocks();
    	System.out.println(stocks);
    	List<StockDTO> result = new ArrayList<>();
    	for(StockFullDTO s : stocks) {
    		 StockDTO r = new StockDTO();
    		 r.setPlace_name(s.getPlace_name());
    		 r.setFlavor_name(s.getMenu_name());
    		 r.setAmount(s.getStock_qty());
    		 
    		 StockOut out = stockmapper.thereIsSameOrderBefore(s.getMenu_id(), s.getPlace_id());
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
    		 r.setSelling(!s.isState());
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
	    if (menudto.getImg().isEmpty()) {
	        return 0;
	    }
	    
	    String originalName = menudto.getImg().getOriginalFilename();
	    String ext = originalName.substring(originalName.lastIndexOf(".")+1).toLowerCase();
	    
	    if(!List.of("jpg","jpeg","png","gif").contains(ext)) {
	    	System.out.println(" 허용되지 않은 확장자:"+ext);
	    	return 0;
	    }
	    
	    String mimeType=menudto.getImg().getContentType();
	    if(mimeType == null || !mimeType.startsWith("image/")) {
	    	System.out.println("이미지 MIME 타입 아님: "+ mimeType);
	    	return 0;
	    }
	    
	    String newFileName = UUID.randomUUID().toString() + "." + ext;

	    // 실행 환경 기준 상대 경로 설정 (src/main/resources/static/img)
	    String path = System.getProperty("user.dir") + File.separator +
	                  "src" + File.separator + "main" + File.separator + "resources" +
	                  File.separator + "static" + File.separator + "img";

	    File filePath = new File(path);

	    // 디렉토리가 없으면 생성 (상위 폴더 포함)
	    if (!filePath.exists()) {
	        filePath.mkdirs();
	        System.out.println("이미지 저장 경로 생성됨: " + path);
	    }

	    String fileFullPath = path + File.separator + originalName;
	    File destfile = new File(fileFullPath);
	    // 클라이언트가 접근할 수 있는 이미지 URL 경로
	    String fileLink = "http://tomhoon.duckdns.org:8881/admin/img/" + originalName;

	    try {
	       
	        menudto.getImg().transferTo(destfile);  // 실제 파일 저장
	        Menu menu = new Menu();
	        menu.setName(menudto.getName());
	        menu.setCode(menudto.getCode());
	        menu.setImg(fileLink);  // DB에는 접근 가능한 URL만 저장
	        menu.setState(false);

	        return stockmapper.saveMenu(menu);

	    } catch (Exception e) {
	        System.out.println("파일 업로드 중 오류: " + e.getMessage());
	    }

	    return 0;
	}
	
	@Transactional
	public void updateState(int id, int state) {
		stockmapper.updateMenu(id , state);
		
	}

	/****************** 메뉴 기능 *********************/



	public void setupInitialStock(String code) {
		// 먼저 code로 메뉴 id를 찾고 placeList를 받아와서 stock에 추가
		int menuId = stockmapper.findMenuByCode(code);
		List<Integer> placeIdList = stockmapper.findPlaceIdAll();
		
		for(Integer placeid:placeIdList) {
			stockmapper.setupInitialStock(menuId, placeid);
		}
		
	}



	
}
