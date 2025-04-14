package com.my.kiosk.pay.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.kiosk.global.classes.Size;
import com.my.kiosk.pay.classes.Pay;
import com.my.kiosk.pay.classes.PayDTO;
import com.my.kiosk.pay.classes.PayDetail;
import com.my.kiosk.pay.classes.PayDetailDTO;
import com.my.kiosk.pay.classes.PayMentDTO;
import com.my.kiosk.pay.classes.PayPageDTO;
import com.my.kiosk.pay.repository.PayMapper;

@Service
public class PayService {

	@Autowired
	PayMapper payMapper;

	public List<PayDTO> getPayList() {
		return payMapper.findAllFast();
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
		for (PayDetail payDetail : payDetails) {
			menuNames.add(payMapper.findMenuNameById(payDetail.getMenu_id()));
		}
		payDetailDTO.setFlavor(menuNames);
		return payDetailDTO;
	}

	public List<PayDTO> getdateFilter(LocalDateTime start, LocalDateTime end) {
		return payMapper.findPayFastByDate(start, end);
	}
	
	/******************************* 결제 테스트 *******************************************/
	public int insertPayData(PayMentDTO payData) {
		Pay pay = new Pay();
		pay.setSize_id(payData.getSize_id());
		pay.setPlace_id(payData.getPlace_id());
		pay.setPay_method(payData.getPay_method());
		pay.setPay_num(payData.getPay_num());
		pay.setPay_date(LocalDateTime.now());
		
		int insertPay = payMapper.insert(pay);
		if(insertPay == 1) {
			int pay_id = pay.getId(); 
			for(Integer menu:payData.getMenuList()) {
				if(payMapper.insertPayDetail(pay_id, menu) != 1) {
					return 0;
				}
			}
			return 1;
		}
		
		return 0;
	}
	/***********************************************************************************/

	public List<PayDetailDTO> getPayDetailByPayNum(Long pay_num) {
		List<Pay> payList = payMapper.findByPayNum(pay_num);
		List<PayDetailDTO> payDetailList = new ArrayList<PayDetailDTO>();
		for(Pay pay:payList) {
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
			for (PayDetail payDetail : payDetails) {
				menuNames.add(payMapper.findMenuNameById(payDetail.getMenu_id()));
			}
			payDetailDTO.setFlavor(menuNames);
			payDetailList.add(payDetailDTO);
		}
		
		return payDetailList;
	}

	public PayPageDTO getPayPage(int page) {
		int total = payMapper.countPayNum();
		int pagesize = 10;
		int startnum = pagesize * (page-1) ;
		int lastpage = (Integer)(total/pagesize) + 1;
		
		
		PayPageDTO payPageDto = new PayPageDTO();
		payPageDto.setPaydtoList(payMapper.findAllPage(startnum, pagesize));
		payPageDto.setLastpage(lastpage);
		
		return payPageDto;
	}
}
