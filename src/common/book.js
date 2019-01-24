/**
 * 定义书籍类
 * 便于构造
 */

export default class book {
  constructor ({openId, average, title, image, publisher, summary, price, tag, author}) {
    this.openId = openId,
    this.average = average,
    this.title = title,
    this.image = image,
    this.publisher = publisher,
    this.summary = summary,
    this.price = price,
    this.tag = tag,
    this.author = author
  }
}
