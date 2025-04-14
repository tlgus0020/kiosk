package com.my.kiosk.pay.classes;

import java.util.List;

import lombok.Data;

@Data
public class PayPageDTO {
	private List<PayDTO> paydtoList;
	private int lastpage;
}
