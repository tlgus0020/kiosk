package com.my.kiosk.stock.classes;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StockFullDTO {
	String place_name;
	String menu_name;
	int stock_qty;
	int place_id;
	int menu_id;
	
	boolean state;
}
