/**
 * 获取轮播图的数据
 */
import { db } from '../request/config'

const BOOK_MAP = 'books'

export function getTopList () {
  return new Promise((resolve, reject) => {
    db
      .collection(BOOK_MAP)
      .limit(9)
      .orderBy('count', 'desc')
      .get()
      .then(e => {
        resolve(e)
      })
  })
}
