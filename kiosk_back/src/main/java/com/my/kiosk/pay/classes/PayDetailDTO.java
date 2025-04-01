package com.my.kiosk.pay.classes;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;

@Data
public class PayDetailDTO {
	private int id;
	private String pay_method;
	private String size;
	private int price;
	private LocalDateTime pay_date;
	private String pay_place;
	private Long pay_num;
	private List<String> flavor;
}
