package com.my.kiosk.stock.classes;

import java.sql.Date;

import lombok.Data;

@Data
public class StockOut {

	private int id;

	private int menuId;

	private int placeId;

	private int amount;

	private Date date;
}
