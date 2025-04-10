package com.my.kiosk.order.repository;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.my.kiosk.stock.classes.StockOut;

@Mapper
public interface StockOrderMapper {

	void insertOrder(@Param("out_id") int out_id, @Param("amount") int amount);

	void insertStockOut(StockOut out);


}
