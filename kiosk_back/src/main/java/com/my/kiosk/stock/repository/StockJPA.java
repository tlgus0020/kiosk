package com.my.kiosk.stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.my.kiosk.stock.classes.Stock;
import com.my.kiosk.stock.classes.StockId;

public interface StockJPA extends JpaRepository<Stock, StockId>{

}
