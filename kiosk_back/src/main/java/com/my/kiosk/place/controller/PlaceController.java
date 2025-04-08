package com.my.kiosk.place.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.my.kiosk.place.service.PlaceService;

@RestController
@RequestMapping("/api/place")
public class PlaceController {
	
	@Autowired
	PlaceService placeService;
	
	@GetMapping("/getnames")
	public ResponseEntity<?> getPlaceName(){
		
		return ResponseEntity.ok().body(placeService.getPlaceId());
	}
	
}
