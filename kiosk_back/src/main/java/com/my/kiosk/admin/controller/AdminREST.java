package com.my.kiosk.admin.controller;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.my.kiosk.stock.classes.Menu;
import com.my.kiosk.stock.classes.MenuDTO;
import com.my.kiosk.stock.classes.StockDTO;
import com.my.kiosk.stock.classes.StockFullDTO;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/admin")
public class AdminREST {

	
	/**
	 * To do
	 * Stock 리스트 : <완료>
	 * Stock 발주 상태 변경. <진행중>
	 * 
	 * 
	 * Pay 리스트;
	 * Pay 필터해서 리스트;
	 *
	 * Menu 리스트; <완료>
	 * Menu 단종 설정;
	 * Menu 등록;  <완료>
	 * 이미지 업로드; <완료>
	 * 
	 */
	
	@Autowired
	AdminService serv;
	
	@GetMapping("/test")
	public List<StockFullDTO> getMethodName() {
		System.out.println("zz");	
		return serv.tester();
	}
	
	
	@PostMapping("/setStockState")
	public ResponseEntity<?> setStockState(@RequestParam("id") String id, @RequestParam("state") String state) {
		System.out.println(id +  state);
		
		serv.setStockState(Integer.parseInt(id),Integer.parseInt(state));
		return ResponseEntity.ok("ㅋ");
	}
	
	@GetMapping("/GetStock")
	public List<StockDTO> getStock(){
		return serv.getStockList();
	}
	
	/****************** 메뉴 기능 *********************/
	@GetMapping("/menulist")
	public ResponseEntity<?> getMenu(){
		List<Menu> menulist = serv.getMenuList();

		return ResponseEntity.ok().body(menulist);
	}
	
	@PostMapping("/addmenu")
	public ResponseEntity<?> addMenu(@ModelAttribute MenuDTO menudto){
		serv.addMenu(menudto);
		serv.setupInitialStock(menudto.getCode());
		return ResponseEntity.ok().body("good");
	}
	
    @GetMapping("/img/{imgPath}")
    public ResponseEntity<?> getBookImg(@PathVariable("imgPath") String imgPath){
    	Path filePath = Paths.get("src/main/resources/static/img").resolve(imgPath);
    	Resource resource;
		try {
			resource = new UrlResource(filePath.toUri());
	    	if(resource.exists() && resource.isReadable()) {
	    		return ResponseEntity.ok()
	    				.header("Content-Type", "image/jpeg")
	    				.body(resource);
	    	}
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
    	
    	
    	return ResponseEntity.notFound().build();
    }
    
}
	/****************** 메뉴 기능 *********************/
	
	
	
