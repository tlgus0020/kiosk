package com.my.kiosk.stock.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.my.kiosk.stock.classes.Stock;
import com.my.kiosk.stock.classes.StockIn;
import com.my.kiosk.stock.classes.StockOut;
import com.my.kiosk.stock.repository.StockMapper;


@Service
public class StockService {

	@Autowired
	StockMapper stockmapper;
	
	//public List<Stock> getStockByPlace(int placeId) {
	//	return stockmapper.selectStockByPlace(placeId);
	//}

	public Stock getStock(int menu_id) {
		return stockmapper.findByMenu_Id(menu_id);
	}
	
	public List<Stock> getAllStock() {
		 return stockmapper.findAll();
	}
	
	
	public void updateStock(int menu_id, int place_id, int amount, boolean isStockIn) {
        Stock stock = stockmapper.getStock(menu_id, place_id);

        // 재고가 없으면 새로 생성
        if (stock == null) {
            stock = new Stock();
            stock.setMenu_id(menu_id);
            stock.setPlace_id(place_id);
            stock.setStock_qty(0); // 새로 생성하면 재고가 0으로 시작
        }

        // 입고이면 +, 출고이면 -
        if (isStockIn) {
            stock.setStock_qty(stock.getStock_qty() + amount);
        } else {
            stock.setStock_qty(stock.getStock_qty() - amount);
        }

        // 업데이트된 재고 저장
        if (stock.getStock_qty() < 0) {
            throw new RuntimeException("재고가 부족합니다.");
        }
        stockmapper.updateStock(stock);
    }

    // 입고 처리
    public void processStockIn(StockIn stockIn) {
        stockmapper.insertStockIn(stockIn); // 입고 데이터 저장
        updateStock(stockIn.getMenu_id(), stockIn.getPlace_id(), stockIn.getAmount(), true); // 재고 업데이트
    }

    // 출고 처리
    public void processStockOut(StockOut stockOut) {
        stockmapper.insertStockOut(stockOut); // 출고 데이터 저장
        updateStock(stockOut.getMenu_id(), stockOut.getPlace_id(), stockOut.getAmount(), false); // 재고 업데이트
    }

	
}
