package com.toppm.toppmcafe24.user;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 사용자가 입력한 데이터 save
     *
     * @param param 사용자가 입력한 data obj
     * @return int
     */
    @RequestMapping("/saveData")
    @ResponseBody
    public int saveData(@RequestBody HashMap<String, Object> param) {

        return userService.saveData(param);
    }

}
