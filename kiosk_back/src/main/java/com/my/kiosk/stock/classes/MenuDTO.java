package com.my.kiosk.stock.classes;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class MenuDTO {
	private String name;
	private MultipartFile img;
	private String code;
}
