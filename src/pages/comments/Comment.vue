<template>
  <div class="comments-box">
    <commentList :comment="listInfo"></commentList>
    <div class="page-title">我的图书</div>
    <Card :book="item" v-for="item in bookInfo" :key="item.id"></Card>
  </div>
</template>
<script>
import { getComment } from '@/api/comment'
import commentList from '@/components/commentList'
import { searchBook } from '@/api/searchBook'
import Card from '@/components/card'
export default {
  components: {
    commentList,
    Card
  },
  data () {
    return {
      listInfo: [],
      bookInfo: []
    }
  },
  // 监听用户下拉刷新
  onPullDownRefresh () {
    // 加载页面
    this.init()
  },
  onShow () {
    wx.showNavigationBarLoading()
    // 获取评论过的图书列表
    this.init()
    wx.stopPullDownRefresh()
    wx.hideNavigationBarLoading()
  },
  methods: {
    // 初始化函数
    async init () {
      this.getCommentList()
      // 获取添加过的书
      this.getBooks()
    },
    async getBooks () {
      this.bookInfo = await searchBook(
        null,
        null,
        wx.getStorageSync('userInfo').openId
      )
    },
    async getCommentList () {
      // 从缓存中取出openId
      this.listInfo = await getComment(
        'openid',
        wx.getStorageSync('userInfo').openId
      )
    }
  }
}
</script>
<style>
</style>
