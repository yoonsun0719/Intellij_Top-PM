package com.toppm.toppmcafe24.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class UserService implements UserMapper {

    @Autowired
    private UserMapper userMapper;

    /**
     * 사용자가 입력한 데이터 insert
     *
     * @param param obj
     * @return int
     */
    @Override
    public int saveData(HashMap<String, Object> param) {

        return userMapper.saveData(param);
    }
}
