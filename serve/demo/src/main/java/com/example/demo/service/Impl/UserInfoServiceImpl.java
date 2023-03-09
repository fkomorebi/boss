package com.example.demo.service.Impl;

import com.example.demo.mapper.UserInfoMapper;
import com.example.demo.pojo.UserInfo;
import com.example.demo.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserInfoServiceImpl implements UserInfoService {
    @Autowired
    private UserInfoMapper userInfoMapper;
    @Override
    public Map<String, Object> selectConfigList(UserInfo userInfo, Integer pageSize, Integer pageIndex) {
        Map<String, Object> res = new HashMap<>();
        res.put("userList", userInfoMapper.selectUserInfoList(userInfo, pageSize, pageIndex));
        res.put("size", userInfoMapper.selectUserInfoCount(userInfo));
        return res;
    }

    @Override
    public Long insertUserInfo(UserInfo userInfo) {
        return userInfoMapper.insertUserInfo(userInfo);
    }

    @Override
    public Long deleteUserInfoById(Long[] ids) {
        return userInfoMapper.deleteUserInfoByIds(ids);
    }

    @Override
    public Long updateUserInfo(UserInfo userInfo) {
        return userInfoMapper.updateUserInfo(userInfo);
    }

    @Override
    public Long recoverUserInfo(Long[] ids) {
        return userInfoMapper.recoverUserInfo(ids);
    }
}
