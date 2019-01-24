/**
 * 请求工具函数
 */

import { db } from './config'
import user from '../common/user'
import { insertUser } from '../api/insertUser'

// 获取用户身份信息(->拉取权限->用户信息入库)
export function getUserInfo () {
  return new Promise((resolve, reject) => {
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success (res) {
        if (!res.authSetting['scope.userInfo']) {
          // 用户没有同意小程序记录身份功能
          // 一般不可能出现这样得判断
          wx.showToast({
            title: '登陆失败',
            icon: 'null',
            duration: 2000
          })
        } else {
          wx.getUserInfo({
            success (res) {
              // 本地存储用户信息
              try {
                wx.showToast({
                  title: '登陆成功',
                  icon: 'success',
                  duration: 2000
                })
                // 保存到数据库（获取openid->执行保存）
                res = res.userInfo
                getOpenId('getOpenid').then(open => {
                  const openId = open.result.openid
                  if (openId != null) {
                    // 信息入库
                    insertUser(
                      new user({
                        avatarUrl: res.avatarUrl,
                        nickName: res.nickName,
                        sex: (res.gender = '1' ? '男' : '女'),
                        city: res.city,
                        openId
                      })
                    )
                  }
                })
              } catch (e) {
                console.log(e)
              }
              resolve(res)
            }
          })
        }
      }
    })
  })
}

// 获取用户openId（云函数）

export function getOpenId (name) {
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name,
      complete: res => {
        if (res != '') {
          resolve(res)
        } else {
          reject(res)
        }
      }
    })
  })
}

export function request (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {
      //   'content-type': 'application/json'
      // }, // 设置请求的 header
      success: function (res) {
        // success
        resolve(res)
      }
    })
  })
}

// get请求
export async function get (url, data) {
  return await request(url, 'GET', data)
}

// post请求
export async function post (url, data) {
  return await request(url, 'POST', data)
}

// 请求数据库值
export function getDbItem (name, primary) {
  return new Promise((resolve, reject) => {
    db
      .collection(name)
      .doc(primary)
      .get()
      .then(res => {
        if (res != undefined || res != '') {
          resolve(res.data)
        } else {
          reject(res)
        }
      })
  })
}

// 消息提示框
export function showMessageQuestion (title, content) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      success (res) {
        if (res.confirm) {
          resolve(true)
        } else if (res.cancel) {
          resolve(false)
        }
      }
    })
  })
}

// 状态提示框
export function showMessage (title, icon) {
  wx.showToast({
    title,
    icon,
    duration: 2000
  })
}
