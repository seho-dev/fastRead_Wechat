/**
 * 查询书籍信息
 */

// 获取数据库引用
import { db } from '../request/config'

// 定义集合名称
const BOOK_MAP = 'books'
const USER_MAP = 'user'

export function searchBook (page, size, openid) {
  // 定义返回数组
  const list = []
  return new Promise((resolve, reject) => {
    const select = db.collection(BOOK_MAP).orderBy('count', 'desc')
    let concat
    if (openid) {
      concat = select.where({
        _openid: openid
      })
    } else {
      // 全部的图书
      concat = select.limit(size).skip(Number(page * size))
    }
    concat.get({
      success (res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        // 拿到每个集合的openId然后调用函数进行查询用户信息（昵称）
        res.data.map(v => {
          // 拿到每个openId
          getUserInfoByOpenId(v.openId).then(user => {
            // 获取user对象提取昵称,第一个用户就是唯一用户的昵称
            const nickName = user.data[0].nickName
            // 把字段添加到当前v对象中
            v = Object.assign({}, v, {
              nickName
            })
            // 添加之后当前的书籍对象，把所有的map放到list中
            list.push(v)
            resolve(list)
          })
        })
      }
    })
  })
}

// 获取复杂查询
const _ = db.command

// 根据openId查询用户信息
export function getUserInfoByOpenId (openId) {
  return new Promise((resolve, reject) => {
    db
      .collection(USER_MAP)
      .where({
        _openid: _.eq(openId)
      })
      .get({
        success (res) {
          resolve(res)
        }
      })
  })
}
