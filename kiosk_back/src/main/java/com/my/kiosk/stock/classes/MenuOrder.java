package com.my.kiosk.stock.classes;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MenuOrder {
	private int id;
	private int out_id;
	private int state;	
	private int amount;
}
