package com.example.demo.mapper;

import java.util.List;

import com.example.demo.pojo.UserInfo;
import org.apache.ibatis.annotations.Param;

/**
 * 参数配置 数据层
 */
public interface UserInfoMapper
{
    public List<UserInfo> selectUserInfoList(@Param("userInfo") UserInfo userInfo,@Param("pageSize") Integer pageSize,@Param("pageIndex") Integer pageIndex);
    public Long selectUserInfoCount(@Param("userInfo") UserInfo userInfo);
    public Long insertUserInfo(UserInfo userInfo);
    public Long deleteUserInfoByIds(Long[] id);
    public Long updateUserInfo(UserInfo userInfo);
    public Long recoverUserInfo(Long[] ids);
}
