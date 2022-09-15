package com.toppm.toppmcafe24.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
public class AdminService implements AdminMapper{
    @Autowired
    private AdminMapper adminMapper;

    /**
     * 어드민 계정 select
     * @return 계정 정보 obj
     */
    @Override
    public HashMap<String, String> findAdminUser() {

        return adminMapper.findAdminUser();
    }

    /**
     * 문의 리스트
     * @return 페이징 처리된 리스트 obj
     */
    @Override
    public List<HashMap<String, Object>> getData(HashMap<String, Object> param) {

        return adminMapper.getData(param);
    }

    /**
     * uuid로 검색한 문의 내용
     * @param param uuid
     * @return 검색 결과 obj
     */
    @Override
    public HashMap<String, Object> findList(HashMap<String, Object> param) {
        return adminMapper.findList(param);
    }

    /**
     * 확인한 문의 내용 상태 업데이트
     * @param param uuid
     * @return int
     */
    @Override
    public int stateUpdate(HashMap<String, Object> param) {

        return adminMapper.stateUpdate(param);
    }

    /**
     * 문의 리스트 행 개수
     * @return int
     */
    @Override
    public int getRowCnt() {
        return adminMapper.getRowCnt();
    }


}
