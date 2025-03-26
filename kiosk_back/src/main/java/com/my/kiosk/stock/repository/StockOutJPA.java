package com.my.kiosk.stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.my.kiosk.stock.classes.StockIn;

public interface StockOutJPA extends JpaRepository<StockIn, Integer>{

}
