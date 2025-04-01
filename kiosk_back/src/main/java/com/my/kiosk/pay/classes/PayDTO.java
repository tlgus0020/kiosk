package com.my.kiosk.pay.classes;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class PayDTO {
	private int id;
	private String pay_method;
	private String size;
	private int price;
	private LocalDateTime pay_date;
	private String pay_place;
	private Long pay_num;
}
