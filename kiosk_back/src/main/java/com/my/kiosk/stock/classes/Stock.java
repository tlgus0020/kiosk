package com.my.kiosk.stock.classes;



import java.sql.Date;
import lombok.Data;

@Data
public class Stock {

	private int menu_id;

	private int place_id;

	private int stock_qty;

	private Date date;

	private boolean selling;
}

