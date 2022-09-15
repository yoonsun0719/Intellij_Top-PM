package com.toppm.toppmcafe24;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashMap;

@Controller
@RequestMapping("/")
public class MainController {

    /**
     * 사용자 페이지 기본 Mapping
     * @return main.html
     */
    @GetMapping("")
    public String Home() {
        return "main";
    }

    /**
     * 서브 페이지 Mapping
     * @param pageNum 페이지 번호
     * @return sub-page/sub{pageNum}.html
     */
    @RequestMapping("/sub{pageNum}")
    public String subPageRoad(@PathVariable int pageNum) {
        return "sub-page/sub" + pageNum;
    }

    /**
     * 팝업 페이지 호출
     * @param param 타이틀, 내용
     * @param model
     * @return common/default-popup.html
     */
    @RequestMapping("/openPopup")
    public String openPopup(@RequestBody HashMap<String, Object> param, Model model) {
        model.addAttribute("title", param.get("title"));
        model.addAttribute("msg", param.get("msg"));
        return "common/default-popup";
    }

    /**
     * 확인 팝업 호출
     * @param param 타이틀, 내용
     * @param model
     * @return "common/confirm-popup.html
     */
    @RequestMapping("/confirmPopup")
    public String openConfirmPopup(@RequestBody HashMap<String, Object> param, Model model) {
        model.addAttribute("title", param.get("title"));
        model.addAttribute("msg", param.get("msg"));
        return "common/confirm-popup";
    }

    /**
     * 로딩 팝업 호출
     * @param param 타이틀
     * @param model
     * @return common/loading-popup.html
     */
    @RequestMapping("/loadingPopup")
    public String loadingPopup(@RequestBody HashMap<String, Object> param, Model model) {
        model.addAttribute("title", param.get("title"));
        return "common/loading-popup";
    }
}