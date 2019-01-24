/**
 * 封装用户信息的对象
 */

export default class user {
  constructor ({avatarUrl, nickName, sex, city, openId}) {
    this.avatarUrl = avatarUrl,
    this.nickName = nickName,
    this.sex = sex,
    this.city = city,
    this.openId = openId
  }
}
