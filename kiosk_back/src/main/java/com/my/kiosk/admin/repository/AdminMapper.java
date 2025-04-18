package com.my.kiosk.admin.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.my.kiosk.stock.classes.StockFullDTO;

@Mapper
public interface AdminMapper {
	public List<StockFullDTO> getFullStocks();

}
