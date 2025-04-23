package com.my.kiosk.stock.repository;


import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.my.kiosk.stock.classes.Menu;
import com.my.kiosk.stock.classes.Stock;
import com.my.kiosk.stock.classes.StockDTO;
import com.my.kiosk.stock.classes.StockIn;
import com.my.kiosk.stock.classes.StockListDTO;
import com.my.kiosk.stock.classes.StockOut;
import com.my.kiosk.stock.classes.User;
import com.my.kiosk.stock.classes.MenuOrder;


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
	MenuOrder getStockOrderState(int id);
	void updateStockOrderState(@Param("outid") int outid, @Param("state") int state);


	void setRetireStock(int menu, int place);
	
	public Integer isRetired(int menu);


	public List<StockListDTO> getStockTotalList();

	public int saveMenu(Menu menu);

	public int findMenuByCode(String code);

	public List<Integer> findPlaceIdAll();

	public void setupInitialStock(@Param("menuId") int menuId, @Param("placeId") int placeId);

	public StockOut getStockOutById(int outid);

	void insertStockOrder(@Param("outid") int outid, @Param("amount") int amount);

	public void increaseStockQty(@Param("menuid") int menuId,@Param("placeid") int placeId,@Param("amount") int amount);
	void insertOrder(@Param("out_id") int out_id, @Param("amount") int amount);

	public void updateMenu(@Param("id") int id, @Param("state") int state);

	public int countStockNum();
	public List<StockDTO> findAllPage(@Param("startnum")int startnum, @Param("pagesize") int pagesize);


}
