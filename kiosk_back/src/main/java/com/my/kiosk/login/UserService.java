package com.my.kiosk.login;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.my.kiosk.stock.classes.User;

@Service
public class UserService {
	
	@Autowired
	UserMapper mapper;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	public boolean register(User user) {
		if (mapper.findByUserid(user.getUserid()) != null) {
            return false; // 중복
        }

        String encodedPwd = passwordEncoder.encode(user.getUserpwd());
        user.setUserpwd(encodedPwd);

        mapper.insertUser(user);
        return true;
    }
}
