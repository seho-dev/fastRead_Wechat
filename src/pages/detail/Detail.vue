<template>
  <div>
    <detail-info :info="info"></detail-info>
    <commentList :comment="commentList"></commentList>
    <!-- 评论框 -->
    <div class="comment" v-show="commentShow">
      <textarea v-model="comment" class="textarea" :maxlength="100" placeholder="请输入图书短评"></textarea>
      <div class="location">地理位置：
        <switch color="#EA5A49" :checked="location" @change="getGeo"></switch>
        <span class="text-primary">{{location}}</span>
      </div>
      <div class="phone">手机型号：
        <switch color="#EA5A49" :checked="phone" @change="getPhone"></switch>
        <span class="text-primary">{{phone}}</span>
      </div>
      <div class="combtn pbtn" @click="addComment">评论</div>
    </div>
    <div class="footer-text" v-show="!commentShow">您未登陆或已评论</div>
  </div>
</template>

<script>
import { addCount, getBookById } from '@/api/detail'
import {addComment, getComment, checkComment} from '@/api/comment'
import detailInfo from '@/components/detailInfo'
import {ak} from '@/request/config'
import {getOpenId, showMessage} from '@/request/util'
import commentList from '@/components/commentList'
export default {
  components: {
    detailInfo,
    commentList
  },
  data () {
    return {
      bookId: '',
      info: {},
      comment: '',
      location: '',
      phone: '',
      commentList: [],
      commentShow: false // 评论界面不开启
    }
  },
  mounted () {
    this.bookId = this.$root.$mp.query.id
    // 访问量
    this.addCount()
    // 获取图书信息通过id
    this.getBookById()
    // 获取评论
    this.getComment()
    // 检查页面有无本人评论
    this.checkComment()
  },
  methods: {
    async checkComment () {
      // 通过内存调用openid是否存在（是否登陆）
      const openId = wx.getStorageSync('userInfo').openId
      if (openId) {
        // 如果登陆拿取用户openid
        const checkState = await checkComment(this.bookId, openId)
        // 判断如果返回结果长度大于0，说明已评论
        if (checkState.length > 0) {
          this.commentShow = false
        } else {
          this.commentShow = true
        }
      } else {
        // 未登陆
        this.commentShow = false
      }
    },
    // 获取评论列表
    async getComment () {
      this.commentList = await getComment('bookid', this.bookId)
    },
    // 添加评论
    async addComment () {
      // 非空判断
      if (this.comment == '') {
        return
      }
      await addComment({
        phone: this.phone,
        location: this.location,
        comment: this.comment,
        bookId: this.bookId
      })
      // 获取评论列表
      this.getComment()
      this.commentShow = false
    },
    async addCount () {
      // 执行添加
      addCount(this.bookId)
    },
    async getBookById () {
      this.info = await getBookById(this.bookId)
    },
    // 改变switch的函数
    getGeo (e) {
      let url = 'http://api.map.baidu.com/geocoder/v2/'
      const self = this
      if (e.target.value) {
        // 选中 获取地理经纬度
        wx.getLocation({
          success (res) {
            // 请求百度API通过经纬度解析真实地址
            wx.request({
              url,
              data: {
                ak,
                location: `${res.latitude},${res.longitude}`,
                output: 'json'
              },
              success: res => {
                console.log(res)
                if (res.data.status === 0) {
                  self.location = res.data.result.addressComponent.city
                } else {
                  self.location = '未知地点'
                }
              }
            })
          }
        })
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        const self = this
        // 选中
        wx.getSystemInfo({
          success (res) {
            self.phone = res.model
          }
        })
      } else {
        this.phone = ''
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.pbtn{
  color:white;
  background:#EA5A49;
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
}
.comment{
  margin-top:20px;
  .textarea{
    width:730rpx;
    height:200rpx;
    background:#eee;
    padding:10rpx;
    text-indent :1em
  }
  .location{
    margin-top:10px;
    padding:5px 10px;
  }
  .phone{
    margin-top:10px;
    padding:5px 10px;
  }
  .combtn{
    margin-top:15px;
    width 750rpx
    text-align center
    float left
    border-right : .5px solid #cccc;
  }
}
</style>
