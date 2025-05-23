package com.my.kiosk.stock.service;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.my.kiosk.stock.classes.Menu;
import com.my.kiosk.stock.classes.MerchDTO;
import com.my.kiosk.stock.classes.Place_SellDTO;
import com.my.kiosk.stock.classes.RecaptchaResponse;
import com.my.kiosk.stock.classes.Stock;
import com.my.kiosk.stock.classes.StockDTO;
import com.my.kiosk.stock.classes.StockIn;
import com.my.kiosk.stock.classes.StockListDTO;
import com.my.kiosk.stock.classes.StockOut;
import com.my.kiosk.stock.classes.StockPageDTO;
import com.my.kiosk.stock.classes.User;
import com.my.kiosk.stock.classes.placeDTO;
import com.my.kiosk.stock.repository.StockMapper;


@Service
public class StockService {

	@Autowired
	StockMapper stockmapper;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	public List<Stock> getStock(int place_id) {
		return stockmapper.findByPlaecID(place_id);
	}
	
	public List<Stock> getAllStock() {
		 return stockmapper.findAll();
	}
	
	
	public void updateStock(int menu_id, int place_id, int amount) {
        Stock stock = stockmapper.getStock(menu_id, place_id);

        if (stock == null) {
            stock = new Stock();
            stock.setMenu_id(menu_id);
            stock.setPlace_id(place_id);
            stock.setStock_qty(0); // 새로 생성하면 재고가 0으로 시작
        }

        stock.setStock_qty(stock.getStock_qty() + amount);


        // 업데이트된 재고 저장
        if (stock.getStock_qty() < 0) {
            throw new RuntimeException("재고가 부족합니다.");
        }
        stockmapper.updateStock(stock);
    }

	
    // 입고 처리
    public void processStockIn(StockIn stockIn) {
        stockmapper.insertStockIn(stockIn); // 입고 데이터 저장
        updateStock(stockIn.getMenu_id(), stockIn.getPlace_id(), stockIn.getAmount()); // 재고 업데이트
    }

    
    //발주state 처리할때..
    //발주state가 기존에 있다면 기존의 발주 state를 변경해야할 필요가 있음. 가장 최근에 동일한 조건의 출고 내역을 확인해서 내역이 있는지 확인.
    //있다 -> 재발주, 기존 StockOut의 id로 state를 select해서, 새로 만든 StockOut id로 update하고 state 0으로 바꿈.
    // 출고 처리
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

    public List<StockDTO> getStockList(){
    	List<Stock> stocks = stockmapper.findAll();
    	System.out.println(stocks);
    	List<StockDTO> result = new ArrayList<>();
    	for(Stock s : stocks) {
    		StockDTO r = new StockDTO();
    		 r.setPlace_name(stockmapper.getPlaceName(s.getPlace_id()));
    		 r.setFlavor_name(stockmapper.getMenuName(s.getMenu_id()));
    		 r.setAmount(s.getStock_qty());
    		 
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
    
    public User login(String userid,String userpwd, String captchaToken) {
    	
        if (!verifyCaptcha(captchaToken)) {
            return null;
        }
        
    	User user= stockmapper.findByUserId(userid);
    	System.out.println("서비스 : "+user);
		if(user == null) {
			return null;
		} 
		if(!passwordEncoder.matches(userpwd, user.getUserpwd())) {
            return null;
        }

        return user; // 로그인 성공
    }
    
    public boolean verifyCaptcha(String captchaToken) {
        String secretKey = "6LfxLiErAAAAAFTKBXa4MVTH_evFgHMthyi1SXm4"; // 캡챠 비밀키!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        String url = "https://www.google.com/recaptcha/api/siteverify";

        RestTemplate restTemplate = new RestTemplate();

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("secret", secretKey);
        params.add("response", captchaToken);

        try {
            RecaptchaResponse response = restTemplate.postForObject(url, params, RecaptchaResponse.class);
            return response != null && response.isSuccess();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    
    public List<placeDTO> getPlaceList(){
    	List<String> s = stockmapper.getPlaceNames();
    	List<placeDTO> pc = new ArrayList<>();
    	for(String st : s) {
    		 placeDTO p = new placeDTO();
    		 p.setPlace_name(st);
    		 pc.add(p);
    	}
    	
    	return pc ;
    }
    
   
    
    public boolean doRetire(String menu) {
    	stockmapper.setRetire(Integer.parseInt(menu));
    	
    	return true;
    }
    
    public boolean doRetire(String menu,String place) {
    	stockmapper.setRetireStock(Integer.parseInt(menu), Integer.parseInt(place));
    	return true;
    }
    
    public List<MerchDTO> getMerchList(){
    	List<Menu> m =  stockmapper.getAllMenu();
    	List<MerchDTO> dto = new ArrayList<>();
    	for(Menu me : m) {
    		MerchDTO dtos = new MerchDTO();
    		dtos.setMenu_id(me.getId());
    		dtos.setMenu_name(me.getName());
    		dtos.setSelling(me.isState());
    		List<Place_SellDTO> psl = new ArrayList<Place_SellDTO>();
    		for(Integer i : stockmapper.getPlaceId()) {
        		Place_SellDTO ps = new Place_SellDTO();
        		ps.setPlace_id(i);
        		Integer a = stockmapper.getPlaceSellingById(me.getId(),i);
        		ps.setSelling(a == null? false : (a == 1? true : false));
        		psl.add(ps);
    		}
    		dtos.setSellstate(psl);
    		dto.add(dtos);
    	}
    	return dto;
    }

	public List<StockListDTO> getStockTotalList() {
		return stockmapper.getStockTotalList();
	}
	
	public StockPageDTO getStockPage(int page) {
		int total = stockmapper.countStockNum();
		int pagesize = 10;
		int startnum = pagesize * (page-1) ;
		int lastpage = (Integer)(total/pagesize) + 1;
		
		 
		StockPageDTO stockPageDto = new StockPageDTO();
		stockPageDto.setStockdtoList(stockmapper.findAllPage(startnum, pagesize));
		stockPageDto.setLastpage(lastpage);
		
		return stockPageDto;
	}
}
