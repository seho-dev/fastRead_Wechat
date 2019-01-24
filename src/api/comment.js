/**
 * 关于评论的数据库逻辑
 */

import { db } from '@/request/config'
import { getUserInfoByOpenId } from '@/api/searchBook'

const COMMENT_MAP = 'comment'
const BOOK_MAP = 'books'

// 增加评论，传递评论对象
export function addComment (comment) {
  db
    .collection(COMMENT_MAP)
    .add({
      data: {
        location: comment.location,
        phone: comment.phone,
        comment: comment.comment,
        bookId: comment.bookId,
        createDate: new Date()
      }
    })
    .then(res => {
      console.log(res)
    })
}

export function getComment (type, Id) {
  // 定义返回数组
  let returnArray = []
  return new Promise((resolve, reject) => {
    const result = db.collection(COMMENT_MAP).orderBy('createDate', 'desc')
    let concat
    // 判断传递类型
    if (type === 'openid') {
      // 说明是用户自己查询的评论（评论页面）
      concat = result.where({
        _openid: Id
      })
    } else if (type === 'bookid') {
      // 说明是用户进入详情页面查询的评论
      concat = result.where({
        bookId: Id
      })
    }
    concat.get().then(res => {
      // 循环结果
      res.data.map(v => {
        const openId = v.openId
        // 获取到openId查询User表的nickName和头像url
        getUserInfoByOpenId(openId).then(res => {
          const info = res.data[0]
          // 拿到info之后添加到数组中
          returnArray.push(
            Object.assign({}, v, {
              name: info.nickName,
              avatarUrl: info.avatarUrl
            })
          )
          resolve(returnArray)
        })
      })
    })
  })
}

// 传递图书ID和openId查询有无本用户的评论
export function checkComment (bookId, openId) {
  return new Promise((resolve, reject) => {
    // 根据bookid查询所有评论
    db
      .collection(COMMENT_MAP)
      .where({
        bookId: bookId // 匹配
      })
      .get()
      .then(res => {
        // 查询到所有的评论
        const comments = res.data
        resolve(
          comments.map(v => {
            return v._openid === openId // 如果openid查询成功
          })
        )
      })
  })
}

// // 返回评论过的列表
// export function overCommentBookList(openId){
//     return new Promise((resolve,reject)=>{
//        db.collection(COMMENT_MAP)
//          .where({
//           _openid:openId
//          })
//          .get().then(res=>{
//           resolve(res.data)
//          })
//     })
// }
