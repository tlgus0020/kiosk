package com.my.kiosk.place.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.kiosk.place.repository.PlaceMapper;

@Service
public class PlaceService {

	@Autowired
	PlaceMapper placeMapper;

	public List<String> getPlaceId() {
		return placeMapper.getPlaceNames();
	}
	
}
