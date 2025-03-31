package com.my.kiosk.stock.classes;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MerchDTO {
	public int menu_id;
	public String menu_name;
	private boolean isSelling;
	private List<Place_SellDTO> sellstate;
}
