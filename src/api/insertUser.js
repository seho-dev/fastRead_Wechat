/**
 * 保存用户信息到数据库
 */
// 获取数据库引用
import { db } from '../request/config'
// 定义集合名称
const USER_MAP = 'user'

// 传递用户对象
export async function insertUser (user) {
  // 检查用户对象是否存在于数据库中
  const info = await checkUser(user)
  if (info.length > 0) {
    console.log('大于0')
    return
  }
  db.collection(USER_MAP).add({
    data: {
      avatarUrl: user.avatarUrl,
      nickName: user.nickName,
      sex: user.sex,
      city: user.city,
      openId: user.openId
    },
    // 成功回调
    success (res) {
      console.log('创建成功')
      console.log(res)
    }
  })
}

export function checkUser (user) {
  return new Promise((resolve, reject) => {
    db
      .collection(USER_MAP)
      .where({
        _openid: user.openId
      })
      .get()
      .then(res => {
        resolve(res.data)
      })
  })
}
