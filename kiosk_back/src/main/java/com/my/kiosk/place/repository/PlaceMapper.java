package com.my.kiosk.place.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PlaceMapper {

	public List<String> getPlaceNames();

}
