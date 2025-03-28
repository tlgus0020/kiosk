package com.my.kiosk.stock.repository;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.my.kiosk.stock.classes.Stock;
import com.my.kiosk.stock.classes.StockIn;
import com.my.kiosk.stock.classes.StockOut;


@Mapper
public interface StockMapper {

	public Stock findByMenu_Id(int menu_id);
	
	public List<Stock> findAll();
	
    void updateStock(Stock stock);

    // 입고 데이터 삽입
    void insertStockIn(StockIn stockIn);

    // 출고 데이터 삽입
    void insertStockOut(StockOut stockOut);

	public Stock getStock(int menu_id, int place_id);

	
}
