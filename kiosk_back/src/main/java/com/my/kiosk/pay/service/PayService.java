package com.my.kiosk.pay.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.kiosk.global.classes.Size;
import com.my.kiosk.pay.classes.Pay;
import com.my.kiosk.pay.classes.PayDTO;
import com.my.kiosk.pay.classes.PayDetail;
import com.my.kiosk.pay.classes.PayDetailDTO;
import com.my.kiosk.pay.repository.PayMapper;

@Service
public class PayService {

	@Autowired
	PayMapper payMapper;

	public List<PayDTO> getPayList() {
		List<Pay> paylist = payMapper.findAll();
		List<PayDTO> payDTOList = new ArrayList<PayDTO>();
		
		for(Pay pay:paylist) {
			PayDTO payDTO = new PayDTO();
			
			payDTO.setId(pay.getId());
			payDTO.setPay_method(pay.getPay_method());
			Size size = payMapper.findSizeById(pay.getSize_id());
			payDTO.setSize(size.getSize()); 
			payDTO.setPrice(size.getPrice());
			payDTO.setPay_date(pay.getPay_date());
			payDTO.setPay_place(payMapper.findPlaceById(pay.getPlace_id()).getName());
			payDTO.setPay_num(pay.getPay_num());
			
			payDTOList.add(payDTO);
		}
		
		return payDTOList;
	}

	public PayDetailDTO getPayDetailById(int id) {
		Pay pay = payMapper.findById(id);
		PayDetailDTO payDetailDTO = new PayDetailDTO();
		payDetailDTO.setId(pay.getId());
		payDetailDTO.setPay_method(pay.getPay_method());
		Size size = payMapper.findSizeById(pay.getSize_id());
		payDetailDTO.setSize(size.getSize()); 
		payDetailDTO.setPrice(size.getPrice());
		payDetailDTO.setPay_date(pay.getPay_date());
		payDetailDTO.setPay_place(payMapper.findPlaceById(pay.getPlace_id()).getName());
		payDetailDTO.setPay_num(pay.getPay_num());
		
		List<PayDetail> payDetails = payMapper.findPayDetailByPayId(pay.getId());
		List<String> menuNames = new ArrayList<String>();
		for(PayDetail payDetail:payDetails) {
			menuNames.add(payMapper.findMenuNameById(payDetail.getMenu_id()));
		}
		payDetailDTO.setFlavor(menuNames);
		return payDetailDTO;
	}
	
}
