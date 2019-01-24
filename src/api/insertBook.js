/**
 * 插入书籍到云数据库中
 */

// 获取数据库引用
import { db } from '../request/config'
// 定义集合名称
const BOOK_MAP = 'books'

// 插入(必选参数：书籍对象)

export function insertBook (Book) {
  db.collection(BOOK_MAP).add({
    data: {
      // 主键ID：用户的OPEN_ID
      // _id: Book.openId,
      openId: Book.openId,
      average: Book.average,
      title: Book.title,
      image: Book.image,
      publisher: Book.publisher,
      summary: Book.summary,
      price: Book.price,
      tag: Book.tag,
      author: Book.author,
      count: 1 // 阅读数默认
    },
    // 成功回调
    success (res) {
      console.log('创建成功')
      console.log(res)
    }
  })
}
