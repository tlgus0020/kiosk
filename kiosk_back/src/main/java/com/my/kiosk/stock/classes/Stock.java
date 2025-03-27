package com.my.kiosk.stock.classes;

import java.sql.Date;

import lombok.Data;

@Data
public class Stock {
	
	private int menuId;
	
	private int placeId;
	
	private int stockQty;
	
	private Date date;
}
