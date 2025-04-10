package com.my.kiosk.stock.classes;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;


@Data
public class StockOut {

	private int id;

	private int menu_id;

	private int place_id;

	private int amount;

	private Date date;
}
