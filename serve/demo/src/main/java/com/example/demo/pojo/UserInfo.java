package com.example.demo.pojo;

import lombok.Getter;
import lombok.Setter;

/**
 * 用户信息
 */
@Getter
@Setter
public class UserInfo {
  private Integer id;
  /**
   * 用户名
   */
  private String name;
  /**
   * 性别
   */
  private String sex;
  /**
   * 电话号码
   */
  private String phone;
  /**
   * 用户地址
   */
  private String address;
  /**
   * 删除标识
   */
  private Integer delFlag;
  /**
   * 年龄
   */
  private Integer age;
}
