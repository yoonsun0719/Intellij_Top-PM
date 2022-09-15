package com.toppm.toppmcafe24.user;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface UserMapper {

    public int saveData(HashMap<String, Object> param);

}
