package com.my.kiosk;

import java.util.Scanner;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;


//@MapperScan("com.my.kiosk.stock.repository")
@SpringBootApplication(exclude = {
	    org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class
	})
public class KioskApplication {

	public static void main(String[] args) {
		SpringApplication.run(KioskApplication.class, args);
	}
	

}
