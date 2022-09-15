package com.toppm.toppmcafe24.admin;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface AdminMapper {

    HashMap<String, String> findAdminUser();

    List<HashMap<String, Object>> getData(HashMap<String, Object> param);

    HashMap<String, Object> findList(HashMap<String, Object> param);

    int stateUpdate(HashMap<String, Object> param);

    int getRowCnt();

}
