package com.my.kiosk.stock.classes;

import lombok.Data;

@Data
public class User {
	private int id;
	private String userid;
	private String userpwd;
	private int placeid;
	private String role;
}
