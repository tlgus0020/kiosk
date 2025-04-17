package com.my.kiosk.menu;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MenuMapper {

	public List<GetMenuDTO> findPageMenu(@Param("startnum") int startnum,@Param("endnum") int endnum);

}
