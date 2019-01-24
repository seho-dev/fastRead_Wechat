/**
 * 扫码添加图书
 * 阿凡达大数据：http://api.avatardata.cn/BookInfo/FindByIsbn
 */

// 引入请求库
import {api} from '../request/config'
import { db } from '../request/config'

// 获取book类
import book from '../common/book'
const BOOK_MAP = 'books'
// 获取图书信息
export function getBookInfo (isbn, openId) {
  return new Promise(async (resolve, reject) => {
    if (isbn != '' || openId != '') {
      const url = api + isbn
      wx.request({
        url,
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {
        //   'content-type': 'application/json'
        // }, // 设置请求的 header
        success: function (res) {
          const bookInfo = res.data.result
          // 拿到书的信息，查询数据库中有无此书(按照每本书的图像地址查询，图像地址是唯一的)
          db.collection(BOOK_MAP), where({
            image: bookInfo.image
          }).get().then(res => {
            const i = res.data.length // 如果从数据库查询出来同样的记录
            console.log('添加图书，尝试查询数据库' + i)
            if (i > 0) {
              resolve('error')
            } else {
              resolve(new book({
                openId,
                average: bookInfo.rating.average,
                title: bookInfo.title,
                image: bookInfo.image,
                publisher: bookInfo.publisher,
                summary: bookInfo.summary,
                price: bookInfo.price,
                // 处理tag，拆分
                tag: bookInfo.tags.map(v => {
                  return `${v.name} ${v.count}`
                }).join(','),
                author: bookInfo.author.join(',')
              }))
            }
          })
          resolve(res)
        }
      })
    }
  })
}
