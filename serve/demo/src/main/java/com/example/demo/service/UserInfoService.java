package com.example.demo.service;

import com.example.demo.pojo.UserInfo;

import java.util.Map;

public interface UserInfoService {
    public Map<String, Object> selectConfigList(UserInfo userInfo, Integer pageSize, Integer pageIndex);
    public Long insertUserInfo(UserInfo userInfo);
    public Long deleteUserInfoById(Long[] id);
    public Long updateUserInfo(UserInfo userInfo);
    public Long recoverUserInfo(Long[] ids);
}
