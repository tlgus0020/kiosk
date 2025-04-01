package com.my.kiosk.pay.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.my.kiosk.global.classes.Place;
import com.my.kiosk.global.classes.Size;
import com.my.kiosk.pay.classes.Pay;

@Mapper
public interface PayMapper {

	public List<Pay> findAll();
	public Size findSizeById(int id);
	public Place findPlaceById(int place_id);

}
