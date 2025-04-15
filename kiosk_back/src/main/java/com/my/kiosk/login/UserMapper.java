package com.my.kiosk.login;

import org.apache.ibatis.annotations.Mapper;

import com.my.kiosk.stock.classes.User;

@Mapper
public interface UserMapper {

	User findByUserid(String userid);

	void insertUser(User user);

}
