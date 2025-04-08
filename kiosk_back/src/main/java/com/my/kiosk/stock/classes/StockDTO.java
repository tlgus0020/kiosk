package com.my.kiosk.stock.classes;

import lombok.Getter;
import lombok.Setter;



/**
 * 음..
 * 
 */
@Getter
@Setter
public class StockDTO {
	String place_name;
	String flavor_name;
	int amount;
	boolean selling;
	int inOrder;
	int place_id;
	int flavor_id;
	int out_id;
}


