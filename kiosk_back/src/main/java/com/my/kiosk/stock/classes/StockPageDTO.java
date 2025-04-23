package com.my.kiosk.stock.classes;

import java.util.List;

import com.my.kiosk.pay.classes.PayDTO;

import lombok.Data;

@Data
public class StockPageDTO {
	private List<StockDTO> stockdtoList;
	private int lastpage;
}
