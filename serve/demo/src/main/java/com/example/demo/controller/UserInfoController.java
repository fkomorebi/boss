package com.example.demo.controller;

import com.example.demo.pojo.AjaxResult;
import com.example.demo.pojo.UserInfo;
import com.example.demo.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserInfoController {
    @Autowired
    private UserInfoService userInfoService;

    @GetMapping("/list")
    public AjaxResult list(UserInfo userInfo, Integer pageSize, Integer pageIndex) {
        if (pageSize == null || pageSize <= 0 || pageIndex == null || pageIndex <= 0) {
            return AjaxResult.error();
        }
        return AjaxResult.success(userInfoService.selectConfigList(userInfo, pageSize, (pageIndex-1)*pageSize));
    }

    @PostMapping("/add")
    public AjaxResult addUser(@RequestBody UserInfo userInfo) {
        if (userInfo == null) {
            return AjaxResult.error();
        }
        Long row = userInfoService.insertUserInfo(userInfo);
        Integer id = userInfo.getId();
        Map<String, Object> res = new HashMap<>();
        res.put("row", row);
        res.put("id", id);
        return AjaxResult.success(res);
    }
    @PutMapping("/update")
    public AjaxResult updateUser(@RequestBody UserInfo userInfo) {
        if (userInfo == null) {
            return AjaxResult.error();
        }
        return AjaxResult.success(userInfoService.updateUserInfo(userInfo));
    }
    @DeleteMapping("/del")
    public AjaxResult delUser(@RequestBody Long[] userIds) {
        if (userIds == null) {
            return AjaxResult.error();
        }
        return AjaxResult.success(userInfoService.deleteUserInfoById(userIds));
    }

    @PutMapping("/recover")
    public AjaxResult recover(@RequestBody Long[] userIds) {
        if (userIds == null) {
            return AjaxResult.error();
        }
        return AjaxResult.success(userInfoService.recoverUserInfo(userIds));
    }
}
