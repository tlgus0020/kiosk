package com.my.kiosk.stock.classes;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Menu {
	int id;
	String name;
	String img;
	String code;
	boolean state;
}
