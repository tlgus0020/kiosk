package com.my.kiosk.stock.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.my.kiosk.stock.classes.Stock;

@Mapper
public interface StockMapper {
    List<Stock> selectStockByPlace(@Param("placeId") int placeId);
}
