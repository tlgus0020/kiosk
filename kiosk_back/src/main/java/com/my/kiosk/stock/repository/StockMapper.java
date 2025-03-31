package com.my.kiosk.stock.repository;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.my.kiosk.stock.classes.Menu;
import com.my.kiosk.stock.classes.Stock;
import com.my.kiosk.stock.classes.StockIn;
import com.my.kiosk.stock.classes.StockOut;
import com.my.kiosk.stock.classes.User;


@Mapper
public interface StockMapper {

	public List<Stock> findByPlaecID(@Param("place_id") int place_id);
	
	public List<Stock> findAll();
	
    void updateStock(Stock stock);

    // 입고 데이터 삽입
    void insertStockIn(StockIn stockIn);

    // 출고 데이터 삽입
    void insertStockOut(StockOut stockOut);

	public Stock getStock(int menu_id, int place_id);
	public StockOut thereIsSameOrderBefore(int menu_id, int place_id);
	public void insertStockOrder(int outid);
	public void updateStockOrder(int outid, int oldid);
	public String getPlaceName(int id);
	public String getMenuName(int id);
	
	// 로그인처리
	public User findByUserId(@Param("userid") String userid);
		

	public List<String> getPlaceNames();
	public List<Menu> getAllMenu();
	public List<Integer> getPlaceId();
	public Integer getPlaceSellingById(int menu, int place);
	
	void setRetire(int menu);
	
	void setRetireStock(int menu, int place);
	
	public Integer isRetired(int menu);
}
