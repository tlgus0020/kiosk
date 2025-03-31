package com.my.kiosk.stock.classes;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Menu {
	int id;
	String name;
	int price;
	String img;
	boolean state;
}
