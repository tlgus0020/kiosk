package com.my.kiosk.pay.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.my.kiosk.global.classes.Place;
import com.my.kiosk.global.classes.Size;
import com.my.kiosk.pay.classes.Pay;
import com.my.kiosk.pay.classes.PayDetail;

@Mapper
public interface PayMapper {

	public List<Pay> findAll();
	public Size findSizeById(int id);
	public Place findPlaceById(int place_id);
	public Pay findById(int id);
	public List<PayDetail> findPayDetailByPayId(int id);
	public String findMenuNameById(int menu_id);

}
