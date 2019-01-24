/**
 * 请求云json数据库的配置项
 */

// 获取数据库引用
export const db = wx.cloud.database()

/**
 * api相关
 */
const appkey = '12940a96b9984442b0556b3a15e0d812'
export const api = `http://api.avatardata.cn/BookInfo/FindByIsbn?key=${appkey}&isbn=`

// 百度地图AK
export const ak = 'yfoczTGWBg1yuMScxvFlgENeSF36PBRK'
