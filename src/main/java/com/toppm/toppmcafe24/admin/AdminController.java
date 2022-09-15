package com.toppm.toppmcafe24.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    /**
     * 어드민 페이지 기본 Mapping
     *
     * @return admin.html
     */
    @GetMapping("")
    public String adminHome() {

        return "admin";
    }

    /**
     * 로그인 처리
     *
     * @param param(obj) = ID, PW
     * @param session
     * @return Boolean = 성공 : true / 실패 : false
     */
    @RequestMapping(value = "/login")
    @ResponseBody
    public Boolean adminLogin(@RequestBody HashMap<String, Object> param, HttpSession session) {

        HashMap<String, String> findRes = adminService.findAdminUser();

        if(param.get("id").equals(findRes.get("admin_id")) && param.get("pw").equals(findRes.get("admin_pw"))) {
            // 세션에 uuid set
            session.setAttribute("admin_uuid", findRes.get("admin_uuid"));
            return true;
        }
        return false;
    }

    /**
     * 로그아웃 처리
     *
     * @return 어드민 기본 Mapping 호출
     */
    @RequestMapping("/logout")
    public String adminLogout(HttpSession session) {

        // 세션 값 삭제
        session.removeAttribute("admin_uuid");
        return "redirect:/admin";
    }

    /**
     * 요청한 페이지 리스트 호출
     *
     * @param param = page : 사용자 요청 param / max : 10 고정
     * @return admin.html
     */
    @RequestMapping("/getData")
    public ModelAndView getData(@RequestParam HashMap<String, Object> param) {
        ModelAndView mv = new ModelAndView();
        List<HashMap<String, Object>> dataList = adminService.getData(param);
        mv.addObject("dataList", dataList);
        // request_list table 행 개수 (마지막 페이지는 반올림 처리)
        mv.addObject("maxPage", (int) Math.ceil((double) adminService.getRowCnt()/10));
        mv.setViewName("admin");
        return mv;
    }

    /**
     * 사용자가 선택한 리스트의 uuid로 select one
     *
     * @param param = 선택한 리스트의 uuid
     * @return obj
     */
    @RequestMapping("/findList")
    @ResponseBody
    public HashMap<String, Object> findList(@RequestBody HashMap<String, Object> param) {
        // 사용자가 선택한 리스트의 상태값 업데이트
        adminService.stateUpdate(param);
        return adminService.findList(param);
    }


}
