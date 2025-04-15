package com.my.kiosk.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.my.kiosk.stock.classes.User;

@RestController
@RequestMapping("/login")
public class UserController {

	@Autowired
	UserService serv;
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody User user) {
		boolean success = serv.register(user);
		
		if(!success) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 존재하는 아이디입니다.");
		}
		return ResponseEntity.ok("회원가입 완료");
	}
	
}
