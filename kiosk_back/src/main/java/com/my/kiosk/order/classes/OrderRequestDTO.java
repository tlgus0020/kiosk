package com.my.kiosk.order.classes;

import lombok.Data;

@Data
public class OrderRequestDTO {
	private int menu_id;   // 메뉴 번호
    private int place_id;  // 지점 번호
    private int amount; 
}
