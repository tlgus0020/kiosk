package com.my.kiosk.pay.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.my.kiosk.global.classes.Size;
import com.my.kiosk.pay.classes.Pay;
import com.my.kiosk.pay.classes.PayDTO;
import com.my.kiosk.pay.classes.PayDetail;
import com.my.kiosk.place.classes.Place;

@Mapper
public interface PayMapper {

	public List<Pay> findAll();
	public Size findSizeById(int id);
	public Place findPlaceById(int place_id);
	public Pay findById(int id);
	public List<Pay> findByPayNum(Long pay_num);
	public List<PayDetail> findPayDetailByPayId(int id);
	public String findMenuNameById(int menu_id);
	public List<Pay> findPayByDate(@Param("start")LocalDateTime start,@Param("end") LocalDateTime end);
	public List<PayDTO> findAllFast();
	public List<PayDTO> findPayFastByDate(@Param("start")LocalDateTime start,@Param("end") LocalDateTime end);
	
	//키오스크 결제시 내용저장 테스트
	public int insert(Pay pay);
	public int insertPayDetail(@Param("pay_id")int pay_id, @Param("menu")Integer menu);
	public List<PayDTO> findAllPage(@Param("startnum")int startnum, @Param("pagesize") int pagesize);
	public int countPayNum();

}
