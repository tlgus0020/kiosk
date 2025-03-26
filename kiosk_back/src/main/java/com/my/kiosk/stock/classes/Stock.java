package com.my.kiosk.stock.classes;



import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.Data;

@Entity
@IdClass(StockId.class)
@Data
public class Stock {
	
	@Id
	private int menu_id;
	
	@Id
	private int place_id;
	
	@Column(nullable = false)
	private int stock_qty;
	
	@Column(nullable = false)
	private Date date;
}
