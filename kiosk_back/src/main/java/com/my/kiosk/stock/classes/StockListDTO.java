package com.my.kiosk.stock.classes;

import lombok.Data;

@Data
public class StockListDTO {
	private int id;
	private String place_name;
	private String menu_name;
	private String img_path;
	private int stock_qty;
	private boolean product_state;
	private String order_state;
	private int menu_id;
    private int place_id;
}
