package com.my.kiosk.stock.classes;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StockDTO {
	String place_name;
	String flavor_name;
	int amount;
	boolean selling;
	boolean inOrder;
}
