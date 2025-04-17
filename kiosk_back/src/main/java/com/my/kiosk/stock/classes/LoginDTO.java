package com.my.kiosk.stock.classes;

import lombok.Data;

@Data
public class LoginDTO {
	private String userid;
	private String userpwd;
	private String captchaToken;
}
