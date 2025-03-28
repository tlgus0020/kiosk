package com.my.kiosk.stock.classes;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class StockId implements Serializable {
    private int menu_id;
    private int place_id;
}

//복합키 설정 클래스 Stock에서 키를 두개쓰고 있기 때문에
