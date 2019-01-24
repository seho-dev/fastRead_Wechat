/**
 * 关于图书详情的数据库操作
 */

import { db } from '../request/config'
import { getUserInfoByOpenId } from '../api/searchBook'
const _ = db.command
const BOOK_MAP = 'books'

export function addCount (primary) {
  db
    .collection(BOOK_MAP)
    .doc(primary)
    .update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        count: _.inc(1)
      }
    })
}

export function getBookById (id) {
  return new Promise((resolve, reject) => {
    db
      .collection(BOOK_MAP)
      .where({
        _id: id
      })
      .get()
      .then(e => {
        const openId = e.data[0].openId
        getUserInfoByOpenId(openId).then(info => {
          const userInfo = {
            name: info.data[0].nickName,
            headImg: info.data[0].avatarUrl,
            // 进行对源数据字段进行拆分处理
            tag: e.data[0].tag.split(','),
            summary: e.data[0].summary.split('\n')
          }
          const BookInfo = Object.assign({}, e.data[0], userInfo)
          console.log(BookInfo)
          resolve(BookInfo)
        })
      })
  })
}
