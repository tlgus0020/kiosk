package com.my.kiosk.pay.classes;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class Pay {
	private int id;
	private int size_id;
	private int place_id;
	private String pay_method;
	private Long pay_num;
	private LocalDateTime pay_date;
}
