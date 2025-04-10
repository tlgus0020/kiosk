package com.my.kiosk.order.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.my.kiosk.order.classes.OrderRequestDTO;
import com.my.kiosk.order.repository.StockOrderMapper;
import com.my.kiosk.stock.classes.StockOut;

@Service
public class StockOrderService {

	@Autowired
	StockOrderMapper mapper;

	@Transactional
	public void insertOrder(OrderRequestDTO dto) {
	    // 1. 먼저 출고 기록 저장
	    StockOut out = new StockOut();
	    out.setMenu_id(dto.getMenu_id());
	    out.setPlace_id(dto.getPlace_id());
	    out.setAmount(dto.getAmount());
	    mapper.insertStockOut(out); // 여기서 out.id 가 채워짐
	    System.out.println("생성된 출고 ID: " + out.getId());
	    
	    // 2. out_id를 DTO 또는 직접 사용해 발주 등록
	    int outId = out.getId();  // useGeneratedKeys로 채워짐
	    mapper.insertOrder(outId, dto.getAmount());
	}

}
