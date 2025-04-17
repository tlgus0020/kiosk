package com.my.kiosk.menu;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("menu")
public class MenuRestController {

	@Autowired
	MenuService menuService;
	
	@GetMapping("/page/{page}")
	public ResponseEntity<?> getPagingMenu(@PathVariable("page") int page){
		
		return ResponseEntity.ok().body(menuService.getPagingMenu(page));
	}
	
}
