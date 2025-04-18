package com.my.kiosk.menu;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MenuService {

	@Autowired
	MenuMapper menuMapper;

	public List<GetMenuDTO> getPagingMenu(int page) {
		int pagesize = 12;
		int startnum = (page -1) * pagesize + 1;
		int endnum = page * pagesize;
		
		return menuMapper.findPageMenu(startnum, endnum);
	}
	
}
