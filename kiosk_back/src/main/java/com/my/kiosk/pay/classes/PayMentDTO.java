package com.my.kiosk.pay.classes;

import java.util.List;

import lombok.Data;

@Data
public class PayMentDTO {
	private int place_id;
	private Long pay_num;
	private List<Integer> menuList;
	private int size_id;
	private String pay_method;
}
