package com.my.kiosk.stock.classes;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class StockIn {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable = false)
	private int menu_id;
	
	@Column(nullable = false)
	private int place_id;
	
	@Column(nullable = false)
	private int amount;
	
	@Column(nullable = false)
	private Date date;
}
