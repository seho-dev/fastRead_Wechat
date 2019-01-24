<template>
  <div class="container">
    <div class="userInfo">
      <img :src="info.avatarUrl">
      <p>{{info.nickName}}</p>
      <prograss-year></prograss-year>
      <button class="btn" @click="scanBook" v-show="info.openId">添加图书</button>
      <button class="btn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo" v-show="!info.openId">登陆并授权</button>
    </div>
  </div>
</template>
<script>
import {
  getOpenId,
  getUserInfo,
  showMessageQuestion,
  showMessage
} from '@/request/util'
import { getBookInfo } from '@/api/addBooks'
import { insertBook } from '@/api/insertBook'
// 引入组件
import prograssYear from '@/components/prograssYear'
export default {
  components: {
    prograssYear
  },
  // computed: {
  //   showLogin(){
  //     if(this.info.open){

  //     }
  //   }
  // },
  data () {
    return {
      // 用户信息
      info: {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: '未登陆'
      }
    }
  },
  mounted () {
    // 判断缓存中是否存在数据
    this.getStorge()
  },
  methods: {
    // 添加图书
    async addBook (isbn) {
      const bookInfo = await getBookInfo(isbn, this.info.openId)
      // 返回值如果不为空，询问是否保存并提交到数据库
      if (bookInfo != 'error') {
        // 判断
        if (await showMessageQuestion('提示', '确定保存书籍？')) {
          // 保存数据库
          insertBook(bookInfo) // 调用插入书籍的方法，传递book对象
        } else {
          showMessage('此书已存在', 'success')
        }
      } else {
        wx.showToast({
          title: '未找到此书',
          icon: 'none',
          duration: 2000
        })
      }
    },
    bindGetUserInfo (e) {
      // 判断是否授权成功
      if (e.mp.detail.errMsg === 'getUserInfo:ok') {
        // 授权成功
        this.handelClickLogin()
      } else {
        // alert('授权失败，暂未开发')
      }
    },
    // 登陆（授权成功）
    async handelClickLogin () {
      // 获取用户身份信息：地区，年龄等
      const User = await getUserInfo()
      // 获取用户openid,传递云函数名称
      const userInfo = await getOpenId('getOpenid')
      const OpenId = userInfo.result.openid
      // 追加openId
      User.openId = OpenId
      // （存入缓存）
      wx.setStorageSync('userInfo', User)
      // 从本地缓存中拿取用户信息
      this.info = wx.getStorageSync('userInfo')
      // 追加openid到对象
      this.info.openid = OpenId
    },
    getStorge () {
      if (wx.getStorageSync('userInfo') != '') {
        this.info = wx.getStorageSync('userInfo')
      } else {
        this.info = this.info
      }
    },
    // 扫描图书
    scanBook () {
      // 调用扫描
      wx.scanCode({
        success: res => {
          this.addBook(res.result)
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.container {
  padding: 0 30rpx;

  .userInfo {
    margin-top: 100rpx;
    text-align: center;

    img {
      width: 128rpx;
      height: 128rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
  }
}
</style>


